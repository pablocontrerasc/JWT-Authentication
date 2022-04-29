"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("username", None)
    password = request.json.get("password", None)
    # Query your database for username and password
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401
    
    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })


@api.route("/singup", methods=["POST"])
def new_user():
    try:
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        is_active = request.json.get("is_active", None)
      
        userR = User.query.filter_by(email=email).first()
        if userR:
            return {"Error": "Correo ya registrado"}
        user = User(
            name=name, lastname=lastname, email=email, password=password, is_active=True
        )
        db.session.add(user)
        db.session.commit()
        return {"mensaje": "ok"}, 200
    except Exception as e:
        print(f"new_user_ERROR: {e}")
        return (f"new_user_ERROR: {e}"), 500
