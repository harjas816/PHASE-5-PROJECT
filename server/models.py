
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates

from config import db,bcrpyt, SQLAlchemy



class Comment(db.Model, SerializerMixin):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    thread_id = db.Column(db.Integer, db.ForeignKey("threads.id"))


    user = db.relationship("User", back_populates = "comments")
    thread = db.relationship("Thread", back_populates = "comments")

    def __repr__(self):
        return f'ID: {self.id}, Content: {self.content}, User: {self.user}, Thread: {self.thread}'

        



class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.Integer, nullable = False)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable = False)

    comments = db.relationship("Comment", back_populates = "user")
    threads = association_proxy("comments", "thread")

    @property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, new_password):
        new_password_byte_object = new_password.encode('utf-8')
        new_password_hash = bcrpyt.generate_password_hash(new_password_byte_object)
        new_hash_as_string = new_password_hash.decode('utf-8')
        self._password_hash = new_hash_as_string

    def authenticate(self, passed_string):
        return bcrpyt.check_password_hash(
            self.password_hash,
            passed_string.encode("utf-8")
        )


    def __repr__(self):
        return f'ID: {self.id}, Username: {self.username}'



class Thread(db.Model, SerializerMixin):
    __tablename__ = "threads"

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String, nullable = False)

    comments = db.relationship("Comment", back_populates = "thread")
    users = association_proxy("comments", "user")
    
    def __repr__(self):
        return f'ID: {self.id}, Title:{self.title}'
