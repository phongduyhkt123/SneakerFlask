function addToCart(product) {
  // Get the current cart items from the cookies
  const cartItems = getCartItemsFromCookies();

  // Check if the product is already in the cart
  const existingProduct = cartItems.find((item) => item.id === product.id);

  if (existingProduct) {
    // If the product is already in the cart, update its quantity
    existingProduct.quantity++;
  } else {
    // If the product is not in the cart, add it with a quantity of 1
    cartItems.push({
      id: product.id,
      image: product.image,
      name: product.name,
      price: product.price,
      color: product.color,
      quantity: 1,
    });
  }
  // Save the updated cart items to the cookies
  saveCartItemsToCookies(cartItems);
  // Update the cart content in the cartColumn div
  handleCartItemsChange()

  updateAddToCartButton(product.id);
}

function saveCartItemsToCookies(cartItems) {
  // Implement your logic to save the cart items to the cookies.
  // You can use JavaScript Document.cookie API to set cookies.
  // For this example, we assume the cart items are stored in a cookie named "cartItems".
  setCookie("cartItems", JSON.stringify(cartItems));
}

function updateCartContent() {
  $(".cart-column").load(document.URL + " .cart-column");
}

// Utility function to set a cookie with a name, value, and expiration date
function setCookie(name, value, days = 7) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function getCartItemsFromCookies() {
  // Implement your logic to retrieve the cart items from the cookies.
  // You can use JavaScript Document.cookie API to read cookies.
  // For this example, we assume the cart items are stored in a cookie named "cartItems".
  const cartItemsCookie = getCookie("cartItems");
  return cartItemsCookie ? JSON.parse(cartItemsCookie) : [];
}

// Utility function to get a cookie value by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// Function to update cart item quantity and total price
function updateCartItem(itemId, quantity) {
  // Implement your logic to update the cart item quantity in the cookies
  // For this example, we assume you have a function updateCartItemInCookies(itemId, quantity)
  updateCartItemInCookies(itemId, quantity);
  // Update the cart content after modifying the cart items
  handleCartItemsChange();
}

function updateCartItemInCookies(itemId, quantity) {
  const cartItems = getCartItemsFromCookies();
  const updatedCartItems = cartItems.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        quantity,
      };
    }
    return item;
  });
  saveCartItemsToCookies(updatedCartItems);
}

function handleCartItemsChange() {
  updateCartContent();

  // Update the cart total price
  $(".total-price").text('$' + totalPrice());
}

function totalPrice() {
  const cartItems = getCartItemsFromCookies();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  return totalPrice.toFixed(2);
}

// Function to delete a cart item
function deleteCartItem(itemId) {
  // Implement your logic to remove the cart item from the cookies
  // For this example, we assume you have a function deleteCartItemFromCookies(itemId)
  deleteCartItemFromCookies(itemId);
  // Update the cart content after deleting the cart item
  updateCartContent();
}

function deleteCartItemFromCookies(itemId) {
  const cartItems = getCartItemsFromCookies();
  const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
  saveCartItemsToCookies(updatedCartItems);
  updateAddToCartButton(itemId)
}
// Event listener for "plus" button to increase quantity
function addQuantity(element, id) {
  const cartQuantity = $(element).closest(".quantity");
  const quantitySpan = cartQuantity.find(".item-quantity");
  const quantity = parseInt(quantitySpan.text()) + 1;
  updateCartItem(id, quantity);
}

// Event listener for "minus" button to decrease quantity
function reduceQuantity(element, id) {
  const cartQuantity = $(element).closest(".quantity");
  const quantitySpan = cartQuantity.find(".item-quantity");
  const quantity = parseInt(quantitySpan.text()) - 1;
  if (quantity >= 1) {
    updateCartItem(id, quantity);
  }
}

function updateAddToCartButton(productId) {
  const button = $(`.add-to-cart[data-product-id="${productId}"]`);
  const checkmark = $(`.checkmark[data-product-id="${productId}"]`);
  if (button.length) {
    const cartItems = getCartItemsFromCookies();
    const existingProduct = cartItems.find((item) => item.id === productId);
    if (existingProduct) {
      $(button).closest(".add-to-cart-btn").addClass("hide");
      $(checkmark).closest(".add-to-cart-btn").removeClass("hide");

    } else {
      $(button).closest(".add-to-cart-btn").removeClass("hide");
      $(checkmark).closest(".add-to-cart-btn").addClass("hide");
    }
  }
}

$(document).ready(function () {
  // Update the cart content when the page loads
  handleCartItemsChange();
} );
