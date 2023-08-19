from app import app, db
from app import routes

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
    app.run(debug=True)
