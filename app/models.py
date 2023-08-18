from sqlalchemy import Column, Integer, String, Float, ForeignKey, NVARCHAR, DateTime, Date
from sqlalchemy.orm import relationship


# class Product(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     image = db.Column(db.String(200), nullable=False)
#     name = db.Column(db.String(100), nullable=False)
#     description = db.Column(db.Text, nullable=False)
#     price = db.Column(db.Float, nullable=False)
#     color = db.Column(db.String(7), nullable=False)

#     def __repr__(self):
#         return f'<Product {self.name}>'

if __name__ == '__main__':
    db.create_all()