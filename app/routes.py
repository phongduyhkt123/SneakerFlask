# app/routes.py
import json
from flask import render_template,  request, make_response
from .config.colors import YELLOW
from app import app


@app.route('/SneakerFlask')
def product_page():
    with open('app/data/product.json') as f:
        products_data = json.load(f)

    cart_items = request.cookies.get('cartItems')
    cart_items = json.loads(cart_items) if cart_items else []

    cart_item_ids = [item['id'] for item in cart_items]

    return render_template('product.html', products=products_data, cart_items=cart_items, cart_item_ids=cart_item_ids)


@app.route('/get_cart_items', methods=['GET'])
def get_cart_items():
    # Get cart items from cookies using request.cookies
    cart_items = request.cookies.get('cartItems')
    cart_items = json.loads(cart_items) if cart_items else []
    
    # Return the cart items as a JSON response
    return jsonify(cart_items)
