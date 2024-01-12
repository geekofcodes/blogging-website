from flask import Flask, jsonify, request, session, Response
from flask_pymongo import PyMongo
from datetime import datetime
# from werkzeug.security import generate_password_hash, check_password_hash
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import secrets
from bson import ObjectId, json_util

app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes
CORS(app)

# Generate a random secret key
secret_key = secrets.token_hex(16)  # 16 bytes (32 characters in hexadecimal)

app.config['SECRET_KEY'] = secret_key  # Change this to a secure secret key
app.config['MONGO_URI'] = 'mongodb://localhost:27017/blogging-website-db'
mongo = PyMongo(app)
bcrypt = Bcrypt(app)

# API endpoint to register a new user
@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()

        # Check if required fields are present in the request
        if 'username' not in data or 'password' not in data:
            return jsonify({'message': 'Missing required fields'}), 400

        username = data['username']
        password = data['password']

        # Check if the username already exists
        if mongo.db.users.find_one({'username': username}):
            return jsonify({'message': 'Username already exists'}), 400

        # Hash the password before storing it in the database
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Insert user data into the 'users' collection
        user_data = {'username': username, 'password': hashed_password}
        mongo.db.users.insert_one(user_data)

        return jsonify({'message': 'User registered successfully'}), 201

    except Exception as e:
        return jsonify({'message': str(e)}), 500


# API endpoint to authenticate user
@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        # Check if required fields are present in the request
        if 'username' not in data or 'password' not in data:
            return jsonify({'message': 'Missing required fields'}), 400

        username = data['username']
        password = data['password']

        # Check if the username exists in the 'users' collection
        user = mongo.db.users.find_one({'username': username})

        if user and bcrypt.check_password_hash(user['password'], password):
            # Successful login
            # You can include additional information in the session if needed
            session['user_id'] = str(user['_id'])
            return jsonify({'message': 'Login successful'}), 200

        return jsonify({'message': 'Invalid username or password'}), 401

    except Exception as e:
        return jsonify({'message': str(e)}), 500

# API endpoint to check if the user is authenticated
# @app.route('/api/check_auth', methods=['GET'])
# def check_auth():
#     if 'user_id' in session:
#         return jsonify({'authenticated': True})
#     else:
#         return jsonify({'authenticated': False})

# API endpoint to get all blog posts
@app.route('/api/posts', methods=['GET'])
def get_posts():
    # Check if the user is authenticated
    # if 'user_id' not in session:
    #     return jsonify({'message': 'Unauthorized'}), 401

    posts = mongo.db.posts.find()
    
    # Convert ObjectId to string before serializing
    serialized_posts = json_util.dumps({'posts': posts}, default=str)

    return Response(serialized_posts, content_type='application/json')


@app.route('/api/create_post', methods=['POST'])
def create_post():
    try:
        data = request.get_json()

        # Check if required fields are present in the request
        required_fields = ['title', 'content', 'author', 'created_date', 'image']
        if not all(field in data for field in required_fields):
            return jsonify({'message': 'Missing required fields'}), 400

        title = data['title']
        content = data['content']
        author = data['author']
        created_date = data['created_date']
        image = data['image']

        # Assuming 'created_date' is in the format 'YYYY-MM-DD'
        created_date = datetime.strptime(created_date, '%Y-%m-%d')
        
        # # Assuming 'created_date' is in the format 'DD-MM-YYYY'
        # created_date = datetime.strptime(created_date_str, '%d-%m-%Y')

        # Insert post data into the 'posts' collection
        post_data = {
            'title': title,
            'content': content,
            'author': author,
            'created_date': created_date,
            'image': image
        }

        result = mongo.db.posts.insert_one(post_data)

        return jsonify({'message': 'Post created successfully', 'post_id': str(result.inserted_id)}), 201

    except Exception as e:
        return jsonify({'message': str(e)}), 500


@app.route('/api/posts/<post_id>', methods=['GET'])
def get_post(post_id):
    try:
        # Convert post_id to ObjectId
        post_id_obj = ObjectId(post_id)

        # Check if the user is authenticated
        # if 'user_id' not in session:
        #     return jsonify({'message': 'Unauthorized'}), 401

        # Fetch the post by ObjectId
        post = mongo.db.posts.find_one({'_id': post_id_obj})

        if post:
            # Convert ObjectId to string before returning in JSON response
            post['_id'] = str(post['_id'])
            return jsonify({'post': post})
        else:
            return jsonify({'message': 'Post not found'}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 500

# Other routes...

@app.route('/')
def hello():
    return jsonify({'message': 'hello, world'})

if __name__ == '__main__':
    app.run(debug=True)
