from config import app,db,api
from models import Comment,Thread,User
from flask import request, make_response, session
from flask_restful import Resource




class Users(Resource):

    def post(self):
        data = request.get_json()
        
        new_user = User(username = data["username"], password_hash = data["password"], email = data["email"])
        db.session.add(new_user)
        db.session.commit()
        return make_response("You have succesfully signed up!", 201)
    
api.add_resource(Users, "/users")

@app.route('/login', methods = ["POST"])
def login():
    
    data = request.get_json()
    user = User.query.filter_by(username = data["username"]).first()

    if not user:
        return make_response("user not found", 404)
    
    if not user.authenticate(data["password"]):
        return make_response("wrong password", 401)
    
    if user.authenticate(data["password"]):
        return make_response(user.to_dict(), 202)
    
    session["user_id"] = user.id
    

    




if (__name__) == "__main__":
    app.run(port = 5555, debug = True)