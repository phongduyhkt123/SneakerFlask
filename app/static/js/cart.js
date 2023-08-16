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
  handleAddCartItem()

  updateAddToCartButton(product.id);
}

function handleAddCartItem() {
  addProductToCart();

  // Update the cart total price
  $(".total-price").text('$' + totalPrice());
}

function saveCartItemsToCookies(cartItems) {
  setCookie("cartItems", JSON.stringify(cartItems));
}

function addProductToCart() {
  return new Promise(function(resolve, reject) {
    $(".cart-column").load(document.URL + " .cart-column", function(response, status, xhr) {
      if (status === "success") {
        resolve(response);
        doAnimateAdd();
      } else {
        reject(new Error("Failed to load cart column."));
      }
    });
  });
}

function removeProductfromCart(element) {
  return new Promise(function(resolve, reject) {
    $(".cart-column").load(document.URL + " .cart-column", function(response, status, xhr) {
      if (status === "success") {
        doAnimateRemove(element);
        resolve(response);
      } else {
        reject(new Error("Failed to load cart column."));
      }
    });
  });
}

function updateCartContent() {
  $(".cart-column").load(document.URL + " .cart-column")
}

// Utility function to set a cookie with a name, value, and expiration date
function setCookie(name, value, days = 7) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function getCartItemsFromCookies() {
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
function deleteCartItem(element, itemId) {
  deleteCartItemFromCookies(itemId);
  // Update the cart content after deleting the cart item
  handleRemoveCartItem(element);
}

function handleRemoveCartItem(element) {
    removeProductfromCart(element); 

    // Update the cart total price
    $(".total-price").text('$' + totalPrice());
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

function doAnimateAdd() {
  $('.cart-item-img:last').addClass("animate__animated animate__zoomIn")
  $('.cart-item-title:last').addClass("animate__animated animate__fadeInRight animate__delay-1s animate__fast")
  $('.cart-item-price:last').addClass("animate__animated animate__fadeInRight animate__delay-1s animate__fast")
  $('.cart-item-quantity:last').addClass("animate__animated animate__fadeIn animate__delay-1s animate__slow")
  
}

function doAnimateRemove(element) {
  $(element).
}

$(document).ready(function () {
  // Update the cart content when the page loads
  handleCartItemsChange();
} );
