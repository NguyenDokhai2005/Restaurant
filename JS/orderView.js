import { MENU_ITEMS } from './data.js';
import Order from './Order.js';

let cart = [];
let currentOrder = null;

function init() {
    loadMenu();
    bindEvents();
}

function loadMenu() {
    const menuTableBody = document.getElementById('menu-table-body');
    menuTableBody.innerHTML = '';

    MENU_ITEMS.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.price} </td>
            <td>${item.description}</td>
            <td>
                <input type="number" 
                       class="quantity-input" 
                       data-item-id="${index + 1}"
                       min="1" 
                       value="1" 
                       style="width: 60px;">
            </td>
            <td>
                <button class="add-to-cart-btn" 
                        data-item-id="${index + 1}"
                        data-item-name="${item.name}"
                        data-item-price="${item.price}">
                    Thêm vào giỏ
                </button>
            </td>
        `;
        menuTableBody.appendChild(row);
        
        const addBtn = row.querySelector('.add-to-cart-btn');
        addBtn.addEventListener('click', function() {
            addToCart(this);
        });
    });
}

function bindEvents() {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            checkout();
        });
    }
}

function addToCart(button) {
    const itemId = parseInt(button.dataset.itemId);
    const itemName = button.dataset.itemName;
    const itemPrice = parseInt(button.dataset.itemPrice);
    const quantityInput = document.querySelector(`input[data-item-id="${itemId}"]`);
    const quantity = parseInt(quantityInput.value);

    if (quantity <= 0) {
        alert('Số lượng phải lớn hơn 0');
        return;
    }

    const existingItem = cart.find(item => item.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: itemId,
            name: itemName,
            price: itemPrice,
            quantity: quantity
        });
    }

    updateCartDisplay();
    updateCartSummary();
    
    quantityInput.value = 1;
    
    button.textContent = 'Đã thêm!';
    button.style.backgroundColor = '#28a745';
    setTimeout(function() {
        button.textContent = 'Thêm vào giỏ';
        button.style.backgroundColor = '';
    }, 1000);
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== parseInt(itemId));
    updateCartDisplay();
    updateCartSummary();
}

function updateCartQuantity(input) {
    const itemId = parseInt(input.dataset.itemId);
    const newQuantity = parseInt(input.value);
    
    if (newQuantity <= 0) {
        removeFromCart(itemId);
        return;
    }

    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        updateCartSummary();
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Giỏ hàng trống</p>';
        return;
    }

    let html = '';
    cart.forEach(function(item) {
        html += `
            <div class="cart-item">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p class="item-price">${item.price} VND</p>
                </div>
                <div class="item-controls">
                    <input type="number" 
                           class="cart-quantity-input"
                           data-item-id="${item.id}"
                           min="1" 
                           value="${item.quantity}"
                           style="width: 50px; margin-right: 10px;">
                    <button class="remove-from-cart-btn" 
                            data-item-id="${item.id}">
                        Xóa
                    </button>
                </div>
            </div>
        `;
    });
    
    cartItems.innerHTML = html;
    
    const removeBtns = cartItems.querySelectorAll('.remove-from-cart-btn');
    removeBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            removeFromCart(this.dataset.itemId);
        });
    });
    
    const quantityInputs = cartItems.querySelectorAll('.cart-quantity-input');
    quantityInputs.forEach(function(input) {
        input.addEventListener('change', function() {
            updateCartQuantity(this);
        });
    });
}

function updateCartSummary() {
    let subtotal = 0;
    cart.forEach(function(item) {
        subtotal += item.price * item.quantity;
    });
    
    const tax = subtotal * 0.1; 
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = subtotal + " VND";
    document.getElementById('tax').textContent = tax + " VND";
    document.getElementById('total').textContent = total + " VND";

    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.disabled = cart.length === 0;
}

function checkout() {
    if (cart.length === 0) {
        alert('Giỏ hàng trống!');
        return;
    }

    currentOrder = new Order(
        Date.now(),
        'Khách lẻ',
        null
    );

    cart.forEach(function(item) {
        const menuItem = {
            id: item.id,
            name: item.name,
            price: item.price,
            category: '',
            description: ''
        };
        currentOrder.addItem(menuItem, item.quantity);
    });

    const receipt = currentOrder.generateReceipt();
    
    alert(receipt);
    
    cart = [];
    updateCartDisplay();
    updateCartSummary();
    console.log(currentOrder.items);
}

document.addEventListener('DOMContentLoaded', function() {
    init();
});