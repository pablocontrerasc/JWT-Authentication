"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity, get_jwt
from flask_jwt_extended import jwt_required
from flask_jwt_extended import current_user

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
@jwt_required()
def handle_hello():

    response_body = {
        "message": "Mensaje privado desde backend"
    }

    return jsonify(response_body), 200

@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Query your database for username and password
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "Bad email or password"}), 401
    
    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token})



@api.route('/singup', methods=['POST'])
def new_user():
    try:
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        is_active = request.json.get("is_active", None)
      
        userR = User.query.filter_by(email=email).first()
        if userR:
            return {"Error": "Correo ya registrado"}
        user = User(
            email=email, password=password, is_active=True
        )
        db.session.add(user)
        db.session.commit()
        return {"mensaje": "ok"}, 200
    except Exception as e:
        print(f"new_user_ERROR: {e}")
        return (f"new_user_ERROR: {e}"), 500

