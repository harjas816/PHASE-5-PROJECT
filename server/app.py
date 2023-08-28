from config import app,db,api
from models import Comment,Thread,User
from flask import request, make_response, session
from flask_restful import Resource




class Users(Resource):

    def post(self):
        data = request.get_json()
        users = [u.to_dict() for u in User.query.all()]

        for u in users:
            if data["username"] == u["username"]:
                return make_response("Username is already taken", 400)
            elif data["email"] == u["email"]:
                return make_response("Email already in use", 400)
            else:
                new_user = User(username = data["username"], password_hash = data["password"], email = data["email"])
                db.session.add(new_user)
                db.session.commit()
                return make_response("You have succesfully signed up!", 201)
    
    
    def get(self):
        return make_response([u.to_dict() for u in User.query.all()], 202)
    
    def patch(self): 
        data = request.get_json()
        user = User.query.filter_by(username = data["username"]).first()
        if not user:
            return make_response("user not found", 404)
        for key in data:
            try:
                setattr(user, key, data[key])
            except ValueError as v_error:
                return make_response ({"errors": [str(v_error)]}, 422)
        db.session.commit()
        return make_response("edit has been made to your profile", 202)

    
api.add_resource(Users, "/users")

class Threads(Resource):

    def get(self):
        return make_response [[t.to_dict() for t in Thread.query.all()], 204]

@app.route('/login', methods = ["POST"])
def login():
    
    data = request.get_json()
    user = User.query.filter_by(username = data["username"]).first()

    if not user:
        return make_response("user not found", 404)
    
    if not user.authenticate(data["password"]):
        return make_response("wrong password", 401)
    
    if user.authenticate(data["password"]):
        session["user_id"] = user.id
        return make_response(user.to_dict(), 202)
    

@app.route('/authorized', methods = ["GET"])
def authorize():
    try:
        user = User.query.filter(User.id == session.get("user_id")).first()
        return make_response(user.to_dict(), 200)
    except:
        return make_response({"error": "user not found"}, 404)
    
@app.route('/logout', methods = ["DELETE"])
def logout():
    session["user_id"] = None
    return make_response("", 204)




    

    




if (__name__) == "__main__":
    app.run(port = 5555, debug = True)