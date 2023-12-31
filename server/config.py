
# flask imports for backend 
from flask import Flask
# from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import MetaData
from flask_restful import Api
from flask_bcrypt import Bcrypt


#instantiating app 
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False


#defining metadata structure, initializing db
metadata = MetaData(naming_convention={"fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)



#Instantiating REST Api for routing 
api = Api(app)

#Instantiate CORS
# CORS(app)

bcrpyt = Bcrypt(app)

app.secret_key = b'\x12\x1e)c\xe0s\x96\x9aF\xe4b\x94\xc4\xca;\xb5'