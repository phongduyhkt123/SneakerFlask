from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Create the Flask app instance
app = Flask(__name__)

# Database
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:123456@localhost/sneaker?charset=utf8mb4"
db = SQLAlchemy(app)