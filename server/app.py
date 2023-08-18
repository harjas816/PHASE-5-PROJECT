from config import app,api,db
from models import Comment,Thread,User
from flask_restful import Resource,request,make_response




class Signup(Resource):

    def post(self):
        data = request.get_json()
        new_user = User()







if (__name__) == "__main__":
    app.run(port = 5555, debug = True)