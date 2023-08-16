from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates

from config import db

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class Comment(db.model, SerializerMixin):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    thread_id = db.Column(db.Integer, db.ForeignKey("threads.id"))

    user = db.relationship("User", back_populates = "comments")
    thread = db.relationship("Thread", back_populates = "comments")

        



class User(db.model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.Integer, nullable = False)

    comments = db.relationship("Comment", back_populates = "user")
    threads = association_proxy("comments", "thread")

    def __repr__(self):
        return f'ID: {self.id}, Username: {self.username}'



class Thread(db.model, SerializerMixin):
    __tablename__ = "threads"

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String, nullable = False)

    comments = db.relationship("Comment", back_populates = "thread")
    users = association_proxy("comments", "user")
    
    def __repr__(self):
        return f'ID: {self.id}, Title:{self.title}'
