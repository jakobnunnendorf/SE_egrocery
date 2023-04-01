from flask import Flask, request, jsonify, json
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Custom JSON encoder to handle ObjectId
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return super(JSONEncoder, self).default(o)

app.json_encoder = JSONEncoder

# set up the MongoDB connection
client = MongoClient('mongodb://localhost:27017')
db = client['egrocery']
collection = db['inventory2']

# API endpoint for retrieving all list of products (including out of stock items)
@app.route('/products', methods=['GET'])
def get_all_products():
    all_products = collection.find({})
    return jsonify(list(all_products))


# API endpoint for retrieving products by category
@app.route('/product/by_category', methods=['POST'])
def get_products_by_category():
    category_filter = request.json.get('category', None)
    
    if category_filter:
        filtered_products = collection.find({"category": category_filter})
    else:
        filtered_products = collection.find({})
        
    return jsonify(list(filtered_products))

# API endpoint for searching products by their name, brand, price (min and max), availability, currency and category
@app.route('/product/search_v2', methods=['POST'])
def search_products():
    filter_object = request.json
    
    # Search filters
    search_name = filter_object.get('name', None)
    search_brand = filter_object.get('brand', None)
    search_availability = filter_object.get('availability', None)
    min_price = filter_object.get('min_price', None)
    max_price = filter_object.get('max_price', None)
    search_currency = filter_object.get('currency', None)
    search_category = filter_object.get('category', None)

    # MongoDB search filter object
    search_filter = {}

    if search_name:
        search_filter['name'] = {'$regex': search_name, '$options': 'i'}

    if search_brand:
        search_filter['brand'] = {'$regex': search_brand, '$options': 'i'}

    if search_availability:
        search_filter['availability'] = search_availability

    if min_price is not None or max_price is not None:
        price_filter = {}
        if min_price is not None:
            price_filter['$gte'] = float(min_price)
        if max_price is not None:
            price_filter['$lte'] = float(max_price)
        search_filter['price'] = price_filter

    if search_currency:
        search_filter['currency'] = search_currency

    if search_category:
        search_filter['category'] = {'$regex': search_category, '$options': 'i'}

    # Query the database using the search_filter object
    filtered_products = collection.find(search_filter)

    # Convert the filtered products to a list and return as JSON
    return jsonify(list(filtered_products))



# API endpoint for checking the availability of items in the cart
@app.route('/product/check_availability', methods=['POST'])
def check_availability():
    cart_items = request.json.get('cart_items', [])
    availability_status = []

    for item in cart_items:
        item_id = item.get('_id')
        cart_quantity = item.get('quantity', 0)

        if item_id:
            product = collection.find_one({"_id": ObjectId(item_id)})

            if product:
                # Check if the product's quantity is greater than or equal to the requested quantity
                is_available = product['quantity'] >= cart_quantity
                item_availability = {
                    "_id": item_id,
                    "name": product['name'],
                    "availability": "InStock" if is_available else "Out of Stock!",
                    "quantity_left": product['quantity']
                }
                availability_status.append(item_availability)

    return jsonify({"availability_status": availability_status})


# API endpoint for updating the inventory after a purchase
@app.route('/product/purchase', methods=['POST'])
def update_purchased_products():
    # Get the list of purchased items from the request JSON
    purchased_items = request.json.get('purchased_items', [])

    # Iterate through each purchased item
    for item in purchased_items:
        # Get the item's _id and quantity from the JSON object
        item_id = item.get('_id')
        quantity_purchased = item.get('quantity')

        # Check if both _id and quantity are present in the JSON object
        if item_id and quantity_purchased:
            # Retrieve the product from the MongoDB collection using the item's _id
            product = collection.find_one({"_id": ObjectId(item_id)})
            
            # Check if the product exists in the collection
            if product:
                # Calculate the new quantity by subtracting the purchased quantity from the current quantity
                new_quantity = max(product['quantity'] - quantity_purchased, 0)
                
                # Set the new availability status based on the new quantity
                new_availability = "InStock" if new_quantity > 0 else "Out of Stock!"
                
                # Update the product's quantity and availability in the MongoDB collection
                collection.update_one(
                    {"_id": ObjectId(item_id)},
                    {
                        "$set": {
                            "quantity": new_quantity,
                            "availability": new_availability,
                        }
                    }
                )
# Return a JSON response indicating that the purchase and inventory update were successful
    return jsonify({"message": "Purchase and inventory update successful"})




#ADMIN API ENDPOINTS
# api endpoint for adding a new product
@app.route('/product/add', methods=['POST'])
def add_product():
    new_product = request.json

    # Required fields for a new product
    required_fields = ['name', 'sku', 'price', 'availability', 'currency', 'brand', 'breadcrumbs', 'description', 'images', 'url', 'quantity', 'category']

    # Validate the new product by checking if all required fields are present
    for field in required_fields:
        if field not in new_product:
            return jsonify({"error": f"Missing required field: {field}"}), 400

    # Insert the new product into the MongoDB collection
    result = collection.insert_one(new_product)

    # Return a success message with the new product's _id
    return jsonify({"message": "Product added successfully", "_id": str(result.inserted_id)})


#ADMIN API ENDPOINTS
# API endpoint for deleting a product
@app.route('/product/delete', methods=['DELETE'])
def delete_product():
    product_id = request.json.get('_id', None)

    if not product_id:
        return jsonify({"error": "Missing product _id"}), 400

    result = collection.delete_one({"_id": ObjectId(product_id)})

    if result.deleted_count > 0:
        return jsonify({"message": "Product deleted successfully"})
    else:
        return jsonify({"error": "Product not found"}), 404







# @app.route('/product/update', methods=['PUT'])
# def update_product():
#     update_data = request.json

#     # Check if _id is provided in the request JSON
#     if '_id' not in update_data:
#         return jsonify({"error": "Missing _id field"}), 400

#     # Get the _id from the update_data and remove it from the update_data
#     product_id = update_data['_id']
#     del update_data['_id']

#     # Update the product in the MongoDB collection using the _id
#     result = collection.update_one({"_id": ObjectId(product_id)}, {"$set": update_data})

#     # Check if the product was found and updated
#     if result.matched_count == 0:
#         return jsonify({"error": "Product not found"}), 404
#     elif result.modified_count == 0:
#         return jsonify({"message": "No changes made to the product"})
#     else:
#         return jsonify({"message": "Product updated successfully"})





if __name__ == '__main__':
    app.run()



#@app.route('/categories', methods=['GET'])
# def get_categories():
#     filter_object = request.json  # assume filter object is passed in as JSON
#     filtered_categories = collection.find(filter_object)
#     return jsonify(list(filtered_categories))

# API endpoint for retrieving filtered list of products
# @app.route('/product/search', methods=['GET'])
# def get_searched_products():
#     filter_object = request.json  # assume filter object is passed in as JSON
#     #print(request.json)#args.get('search_key', None)) # print the JSON object (debugging)
#     filtered_products = collection.find({'name': 'Tesco Fun Animal Beach Towel'})
#     return jsonify(list(filtered_products))

# API endpoint for searching products by their name, brand, price, availability, currency and
# @app.route('/product/search_v2', methods=['POST'])
# def search_products():
#     filter_object = request.json
#       # Search filters
#     search_name = filter_object.get('name', None)
#     search_brand = filter_object.get('brand', None)
#     search_availability = filter_object.get('availability', None)
#     min_price = filter_object.get('min_price', None)
#     max_price = filter_object.get('max_price', None)
#     search_currency = filter_object.get('currency', None)
#     #search_category = filter_object.get('category', None)

#     search_filter = {}

#     if search_name:
#         search_filter['name'] = {'$regex': search_name, '$options': 'i'}

#     if search_brand:
#         search_filter['brand'] = {'$regex': search_brand, '$options': 'i'}

#     if search_availability:
#         search_filter['availability'] = search_availability

#     if min_price is not None or max_price is not None:
#         price_filter = {}
#         if min_price is not None:
#             price_filter['$gte'] = float(min_price)
#         if max_price is not None:
#             price_filter['$lte'] = float(max_price)
#         search_filter['price'] = price_filter

#     if search_currency:
#         search_filter['currency'] = search_currency

#     filtered_products = collection.find(search_filter)

#     return jsonify(list(filtered_products))

# # API endpoint for checking available items in the cart
# @app.route('/cart', methods=['GET'])
# def get_cart():
#     cart_products = []  # assume the list of cart products is stored in a global variable
#     available_products = []  # list of available products in the cart
#     unavailable_products = []  # list of unavailable products in the cart
#     for item in cart_products:
#         # get the product information from the MongoDB database
#         product_info = collection.find_one({'id': item['product_id']})
#         # check if the item is available
#         if product_info['quantity'] >= item['quantity']:
#             item['available'] = True
#             available_products.append(item)
#         else:
#             item['available'] = False
#             unavailable_products.append(item)
#         # add the product information to the cart item
#         item['product_info'] = product_info
#     return jsonify({'available_products': available_products, 'unavailable_products': unavailable_products})



# # API endpoint for checking available items in the cart
# @app.route('/cart', methods=['GET'])
# def get_cart():
#     cart_items = []  # assume the list of cart items is stored in a global variable
#     for item in cart_items:
#         # get the product information from the MongoDB database
#         product_info = collection.find_one({'id': item['product_id']})
#         # add the product information to the cart item
#         item['product_info'] = product_info
#     return jsonify(cart_items)




# # API endpoint for updating the database with purchase information
# @app.route('/purchase', methods=['POST'])
# def update_database():
#     cart_items = request.json['cart_items']  # assume the cart items are sent in the request body as a JSON object
#     purchased_items = []  # list of purchased items
#     for item in cart_items:
#         # get the product information from the MongoDB database
#         product_info = collection.find_one({'id': item['product_id']})
#         # check if the item is available
#         if product_info['quantity'] >= item['quantity']:
#             # update the product stock in the database
#             new_stock = product_info['quantity'] - item['quantity']
#             collection.update_one({'id': item['product_id']}, {'$set': {'quantity': new_stock}})
#             # add the purchased item to the list
#             purchased_items.append(item)
#     # return the list of purchased items
#     return jsonify(purchased_items)



#  API endpoint for updating a product in the database

# @app.route('/product/update_v2', methods=['PUT'])
# def update_product_v2():

#     product_data = request.json

#     # Check if product _id is provided
#     product_id = product_data.get('_id', None)
#     if not product_id:
#         return jsonify({"error": "Missing product _id"}), 400

#     # Remove the _id from the product_data
#     product_data.pop('_id')

#     # Update the product in the MongoDB collection
#     result = collection.update_one({"_id": ObjectId(product_id)}, {"$set": product_data})

#     if result.matched_count > 0:
#         if result.modified_count > 0:
#             # Return a success message
#             return jsonify({"message": "Product updated successfully"})
#         else:
#             return jsonify({"message": "No changes were made to the product"})
#     else:
#         return jsonify({"error": "Product not found"}), 404