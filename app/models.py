from sqlalchemy import Column, Integer, String, Float, ForeignKey, NVARCHAR, DateTime, Date
from sqlalchemy.orm import relationship

if __name__ == '__main__':
    db.create_all()