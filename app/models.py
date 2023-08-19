from sqlalchemy import Column, Integer, String, Float, ForeignKey, NVARCHAR, DateTime, Date
from sqlalchemy.orm import relationship
from app import db


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    image = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    color = db.Column(db.String(7), nullable=False)

    def __repr__(self):
        return f'<Product {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "image": self.image,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "color": self.color
        }
