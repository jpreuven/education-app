from models import *
from flask import request, make_response, session, abort
from flask_restful import Resource

from app import app, db, api

class Signup(Resource):
    def post(self):
        username = request.get_json()["username"]
        email = request.get_json()["email"]
        new_user = User(
            username=username,
            email=email,
        )
        password = request.get_json()["password"]
        new_user.password_hash = password
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id
        print(f"User ID from session: {session}")
        return make_response(new_user.to_dict(), 200)
    

api.add_resource(Signup, "/signup", endpoint="signup")

class Login(Resource):
    def post(self):
        username = request.get_json()["username"]
        user = User.query.filter(User.username == username).first()
        password = request.get_json()["password"]
        if user.authenticate(password):
            session["user_id"] = user.id
            session.modified = True
            print(f"User Logged in. Session data: {session}")

            return make_response(user.to_dict(), 200)

        return {"error": "Invalid username or password"}, 401

api.add_resource(Login, "/login", endpoint="login")

class CheckSession(Resource):
    def get(self):
        user_id=session.get("user_id")
        session.modified = True
        user = User.query.filter(User.id == session.get("user_id")).first()
        # user_id=session

        print(f"User ID from session: {session}")
        if user:
            return make_response(user.to_dict(), 200)

        else:
            return {"message": "401: Not Authorized"}, 401

api.add_resource(CheckSession, "/check_session")

class Logout(Resource):
    def delete(self):
        session.pop("user_id", None)  # Remove user_id from session
        print(session)
        return {"message": "User logged out successfully"}, 204

api.add_resource(Logout, "/logout")


class Users(Resource):
    def get(self):
        print("worked?")
        users = [user.to_dict() for user in User.query.all()]

        return make_response(users, 200)
    
api.add_resource(Users, "/users")

class UserByID(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if user:
            return make_response(user.to_dict(), 200)
        else:
            return {"message": "401: Not Authorized"}, 401
api.add_resource(UserByID, "/users/<int:id>")

