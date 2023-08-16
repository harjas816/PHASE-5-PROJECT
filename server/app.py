from config import app
from models import Comment,Thread,User








if (__name__) == "__main__":
    app.run(port = 5555, debug = True)