from flask import request, jsonify
from pymongo import MongoClient
from bson import ObjectId
from flask import Blueprint

user_routes = Blueprint('user_routes', __name__)

client = MongoClient('mongodb://localhost:27017')
db = client['egrocery']
user_collection = db['user_data'] # Collection for user data in MongoDB


# API endpoints for user login authentications
@user_routes.route('/user/login', methods=['POST'])
def user_login():
    login_data = request.json
    email = login_data.get('email', None)
    password = login_data.get('password', None)

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    user = user_collection.find_one({"email": email})

    if user and user['password'] == password:
        return jsonify({"message": "Login successful", "user": user})
    else:
        return jsonify({"error": "Invalid email or password"}), 401


# API endpoint for user registration
@user_routes.route('/user/register', methods=['POST'])
def user_register():
    user_data = request.json

    # Required fields for a new user
    required_fields = ['firstName', 'lastName', 'email', 'password', 'phoneNumber', 'address', 'birthdate']

    # Validate the new user by checking if all required fields are present
    for field in required_fields:
        if field not in user_data:
            return jsonify({"error": f"Missing required field: {field}"}), 400

    # Check if the user with the provided email already exists
    existing_user = user_collection.find_one({"email": user_data['email']})

    if existing_user:
        return jsonify({"error": "Email already in use"}), 409

    # Insert the new user into the MongoDB collection
    result = user_collection.insert_one(user_data)

    # Return a success message with the new user's _id
    return jsonify({"message": "User registered successfully", "_id": str(result.inserted_id)})
