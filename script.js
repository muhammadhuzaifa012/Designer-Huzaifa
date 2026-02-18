// Dummy Product Data
const products = [
    {
        id: 1,
        name: "Modern Headphones",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "High-quality wireless headphones with noise cancellation."
    },
    {
        id: 2,
        name: "Smart Watch Series 5",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Stay connected with the latest smart watch technology."
    },
    {
        id: 3,
        name: "Vintage Camera",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Capture moments with this classic vintage camera."
    },
    {
        id: 4,
        name: "Minimalist Backpack",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Stylish and functional backpack for everyday use."
    },
    {
        id: 5,
        name: "Wireless Speaker",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Portable speaker with powerful bass and long battery life."
    },
    {
        id: 6,
        name: "Running Shoes",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Comfortable and durable shoes for your daily run."
    }
];

// Cart State
let cart = [];

// DOM Elements
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

// Render Products
function renderProducts() {
    productList.innerHTML = products.map(product => `
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <h4 class="mt-auto">$${product.price}</h4>
                    <button class="btn btn-primary mt-3" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus me-2"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Change Quantity
function changeQuantity(productId, action) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (action === 'increase') {
            item.quantity += 1;
        } else if (action === 'decrease' && item.quantity > 1) {
            item.quantity -= 1;
        }
    }
    updateCartUI();
}

// Update Cart UI
function updateCartUI() {
    // Update Badge Count
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalCount;

    // Render Cart Items
    if (cart.length === 0) {
        cartItems.innerHTML = '<tr><td colspan="5" class="text-center">Your cart is empty.</td></tr>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td>
                    <button class="btn btn-sm btn-outline-secondary me-1" onclick="changeQuantity(${item.id}, 'decrease')">-</button>
                    ${item.quantity}
                    <button class="btn btn-sm btn-outline-secondary ms-1" onclick="changeQuantity(${item.id}, 'increase')">+</button>
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Update Total Price
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotal.textContent = totalPrice.toFixed(2);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI(); // Initialize empty cart message
});
