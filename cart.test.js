let cart = {};

// Function to add an item to the cart
function addToCart(item) {
    if (cart[item.id]) {
        cart[item.id].quantity += 1;
    } else {
        cart[item.id] = { ...item, quantity: 1 };
    }
}

// Function to change the quantity of an item
function changeQuantity(itemId, amount) {
    if (cart[itemId]) {
        cart[itemId].quantity += amount;
        if (cart[itemId].quantity <= 0) {
            delete cart[itemId];
        }
    }
}

// Function to remove an item from the cart
function removeFromCart(itemId) {
    delete cart[itemId];
}

// Function to apply discount if the coupon code is correct
function applyDiscount(couponCode) {
    const validCoupon = /^WEB3BRIDGECOHORT\d+$/;
    if (validCoupon.test(couponCode)) {
        let total = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
        return total * 0.9; // Apply 10% discount
    } else {
        throw new Error("Invalid coupon code");
    }
}

// Export functions for testing
module.exports = { addToCart, changeQuantity, removeFromCart, applyDiscount, cart };

// Tests start here
const { addToCart, changeQuantity, removeFromCart, applyDiscount, cart } = require('./index');

// Reset cart before each test
beforeEach(() => {
    for (let key in cart) {
        delete cart[key];
    }
});

describe("Shopping Cart Tests", () => {
    test("addToCart should add an item to the cart", () => {
        const item = { id: 1, name: "Test Product", price: 10.0 };
        addToCart(item);
        expect(cart[item.id].name).toBe("Test Product");
        expect(cart[item.id].quantity).toBe(1);
    });

    test("addToCart should increase quantity if the item already exists", () => {
        const item = { id: 1, name: "Test Product", price: 10.0 };
        addToCart(item);
        addToCart(item);
        expect(cart[item.id].quantity).toBe(2);
    });

    test("changeQuantity should increase item quantity", () => {
        const item = { id: 2, name: "Another Product", price: 15.0 };
        addToCart(item);
        changeQuantity(item.id, 2);
        expect(cart[item.id].quantity).toBe(3);
    });

    test("changeQuantity should decrease item quantity and remove if quantity is zero", () => {
        const item = { id: 3, name: "Product to Remove", price: 20.0 };
        addToCart(item);
        changeQuantity(item.id, -1);
        expect(cart[item.id]).toBeUndefined();
    });

    test("removeFromCart should remove an item from the cart", () => {
        const item = { id: 4, name: "Removable Product", price: 25.0 };
        addToCart(item);
        removeFromCart(item.id);
        expect(cart[item.id]).toBeUndefined();
    });

    test("applyDiscount should apply 10% discount with valid coupon code", () => {
        const item = { id: 5, name: "Discounted Product", price: 100.0 };
        addToCart(item);
        const totalWithDiscount = applyDiscount("WEB3BRIDGECOHORT1");
        expect(totalWithDiscount).toBe(90.0);
    });

    test("applyDiscount should throw error with invalid coupon code", () => {
        const item = { id: 6, name: "Another Product", price: 50.0 };
        addToCart(item);
        expect(() => applyDiscount("INVALIDCODE")).toThrow("Invalid coupon code");
    });
});
