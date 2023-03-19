from flask import Flask, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)

# set up the MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['mydatabase']
collection = db['mycollection']

# API endpoint for retrieving filtered list of products
@app.route('/products', methods=['GET'])
def get_products():
    filter_object = request.json  # assume filter object is passed in as JSON
    #print(request.json) # print the JSON object (debugging)
    filtered_products = collection.find(filter_object)
    return jsonify(list(filtered_products))

@app.route('/categories', methods=['GET'])
def get_categories():
    filter_object = request.json  # assume filter object is passed in as JSON
    filtered_categories = collection.find(filter_object)
    return jsonify(list(filtered_categories))


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

# API endpoint for checking available items in the cart
@app.route('/cart', methods=['GET'])
def get_cart():
    cart_products = []  # assume the list of cart products is stored in a global variable
    available_products = []  # list of available products in the cart
    unavailable_products = []  # list of unavailable products in the cart
    for item in cart_products:
        # get the product information from the MongoDB database
        product_info = collection.find_one({'id': item['product_id']})
        # check if the item is available
        if product_info['stock'] >= item['quantity']:
            item['available'] = True
            available_products.append(item)
        else:
            item['available'] = False
            unavailable_products.append(item)
        # add the product information to the cart item
        item['product_info'] = product_info
    return jsonify({'available_products': available_products, 'unavailable_products': unavailable_products})

# API endpoint for updating the database with purchase information
@app.route('/purchase', methods=['POST'])
def update_database():
    cart_items = request.json['cart_items']  # assume the cart items are sent in the request body as a JSON object
    purchased_items = []  # list of purchased items
    for item in cart_items:
        # get the product information from the MongoDB database
        product_info = collection.find_one({'id': item['product_id']})
        # check if the item is available
        if product_info['stock'] >= item['quantity']:
            # update the product stock in the database
            new_stock = product_info['stock'] - item['quantity']
            collection.update_one({'id': item['product_id']}, {'$set': {'stock': new_stock}})
            # add the purchased item to the list
            purchased_items.append(item)
    # return the list of purchased items
    return jsonify(purchased_items)


if __name__ == '__main__':
    app.run(debug=True)
