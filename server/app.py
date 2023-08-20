from config import app,db,api
from models import Comment,Thread,User
from flask import request, make_response
from flask_restful import Resource




class Users(Resource):

    def post(self):
        data = request.get_json()
        new_user = User(username = data["username"], _password_hash = data["password"], email = data["email"])
        db.session.add(new_user)
        db.session.commit()
        return make_response("You have succesfully signed up!", 201)
    
api.add_resource(Users, "/users")







if (__name__) == "__main__":
    app.run(port = 5555, debug = True)