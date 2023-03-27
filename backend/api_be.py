from flask import Flask, request, jsonify, json
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)

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
collection = db['inventory']

# API endpoint for retrieving all list of products
@app.route('/products', methods=['GET'])
def get_all_products():
    all_products = collection.find({})
    return jsonify(list(all_products))

# API endpoint for retrieving filtered list of products
# @app.route('/product/search', methods=['GET'])
# def get_searched_products():
#     filter_object = request.json  # assume filter object is passed in as JSON
#     #print(request.json)#args.get('search_key', None)) # print the JSON object (debugging)
#     filtered_products = collection.find({'name': 'Tesco Fun Animal Beach Towel'})
#     return jsonify(list(filtered_products))


# # API endpoint for searching products by their name, brand, (price, availability, and other attributes)
@app.route('/product/search_v2', methods=['POST'])
def search_products():
    filter_object = request.json
    search_name = filter_object.get('name', None)
    search_brand = filter_object.get('brand', None)
    search_availability = filter_object.get('availability', None)
    min_price = filter_object.get('min_price', None)
    max_price = filter_object.get('max_price', None)
    search_currency = filter_object.get('currency', None)

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

    filtered_products = collection.find(search_filter)

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
        if product_info['quantity'] >= item['quantity']:
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
        if product_info['quantity'] >= item['quantity']:
            # update the product stock in the database
            new_stock = product_info['quantity'] - item['quantity']
            collection.update_one({'id': item['product_id']}, {'$set': {'quantity': new_stock}})
            # add the purchased item to the list
            purchased_items.append(item)
    # return the list of purchased items
    return jsonify(purchased_items)


if __name__ == '__main__':
    app.run()
