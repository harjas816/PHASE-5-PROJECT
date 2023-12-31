
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

    serialize_rules = ("-user.comments", "-thread.comments", "-user.created_threads", "-user.commented_threads")
    def __repr__(self):
        return f'ID: {self.id}, Content: {self.content}, User: {self.user}, Thread: {self.thread}'

        



class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.Integer, nullable = False)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable = False)

    created_threads = db.relationship("Thread", back_populates = "creator")
    comments = db.relationship("Comment", back_populates = "user")
    commented_threads = association_proxy("comments", "thread")

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
    
    serialize_rules = ("-comments.user", "-threads.users", "-_password_hash", "-thread.user")


    def __repr__(self):
        return f'ID: {self.id}, Username: {self.username}'



class Thread(db.Model, SerializerMixin):
    __tablename__ = "threads"

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String, nullable = False)
    description = db.Column(db.String )
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))


    comments = db.relationship("Comment", back_populates = "thread")
    users = association_proxy("comments", "user")
    creator = db.relationship("User", back_populates = "created_threads")

    serialize_rules = ("-users.threads", "-comment.thread",  "-creator.created_threads", "-creator.commented_threads", "-creator.comments", "-creator.email","-users.comments",)
    
    def __repr__(self):
        return f'ID: {self.id}, Title:{self.title}'
