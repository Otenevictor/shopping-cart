// test data for products(laptops)
const products = [
    { id: 1, name: "Apple", price: 1500 },
    { id: 2, name: "Lenovo", price: 300 },
    { id: 3, name: "Hp", price: 400 },
    { id: 4, name: "Acer", price: 250 },
    { id: 5, name: "Dell", price: 700 },
    { id: 6, name: "samsung", price: 850 },
    { id: 7, name: "Asus", price: 380 },
    { id: 8, name: "Toshiba", price: 150 },
    { id: 9, name: "Razer", price: 120 },
    { id: 10, name: "Microsoft", price: 560 }
];

let cart = JSON.parse(localStorage.getItem('cart')) || {};

// display products
function displayProducts() {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";
    products.forEach(product => {
        productsContainer.innerHTML += `
            <div class="product">
                <span>${product.name} - $${product.price}</span>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}

// add product to cart
function addToCart(productId) {
    if (cart[productId]) {
        cart[productId].quantity += 1;
    } else {
        const product = products.find(p => p.id === productId);
        cart[productId] = { ...product, quantity: 1 };
    }
    updateCart();
}

// display cart
function displayCart() {
    const cartContainer = document.getElementById("cart");
    cartContainer.innerHTML = "";
    Object.values(cart).forEach(item => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <span>${item.name} - $${item.price} x ${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    });
    calculateTotal();
}

// change item quantity
function changeQuantity(productId, change) {
    if (cart[productId]) {
        cart[productId].quantity += change;
        if (cart[productId].quantity <= 0) {
            delete cart[productId];
        }
        updateCart();
    }
}

// remove laptop from cart
function removeFromCart(productId) {
    delete cart[productId];
    updateCart();
}

// update cart in local storage and UI
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// calculate total amount
function calculateTotal() {
    let total = Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);
    document.getElementById("totalAmount").textContent = total.toFixed(2);
}

// apply discount
function applyDiscount() {
    const couponCodeInput = document.getElementById("couponCode").value;
    const couponCodePattern = /^WEB3BRIDGECOHORT\d+$/;  // Regex to match 'WEB3BRIDGECOHORT' followed by any digit(s)

    if (couponCodePattern.test(couponCodeInput)) {
        let total = parseFloat(document.getElementById("totalAmount").textContent);
        total *= 0.9; // Apply a 10% discount
        document.getElementById("totalAmount").textContent = total.toFixed(2);
        document.getElementById("message").textContent = "Discount applied!";
        document.getElementById("message").style.color = "green";
    } else {
        document.getElementById("message").textContent = "Invalid coupon code.";
        document.getElementById("message").style.color = "red";
    }
}

// Initialize the app
displayProducts();
displayCart();
