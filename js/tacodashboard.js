const menuItems = [
  { id: 1, name: "Soft Taco", price: 2.50, img: "../img/soft-taco.jpg" },
  { id: 2, name: "Crispy Taco", price: 3.00, img: "../img/crispy-taco.jpg" },
  { id: 3, name: "Burrito", price: 6.50, img: "../img/burrito.jpg" },
  { id: 4, name: "Nachos", price: 4.00, img: "../img/nachos.jpg" }
];

let cart = [];

const menuContainer = document.getElementById("menu-container");
const cartList = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");


function displayMenu() {
  menuContainer.innerHTML = "";

  menuItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "menu-item";

    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="item-info">
        <h3>${item.name}</h3>
        <p>$${item.price.toFixed(2)}</p>
      </div>
      <button class="add-btn" data-id="${item.id}">
        Add to Order
      </button>
    `;

    menuContainer.appendChild(card);
  });
}

function addToCart(id) {
  const product = menuItems.find(item => item.id === id);

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
}



function updateCartUI() {
  cartList.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartList.innerHTML = `
      <div style="text-align:center; padding: 20px; color: #888;">
        <p>Your cart is empty</p>
        <span style="font-size: 2rem;">🌮</span>
      </div>`;
  }

  cart.forEach(item => {
    const li = document.createElement("li");
    const subtotal = item.qty * item.price;
    total += subtotal;

    li.innerHTML = `
      <div class="cart-item-info">
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-subtotal">$${subtotal.toFixed(2)}</span>
      </div>
      <div class="qty-controls">
        <button class="qty-btn minus" data-id="${item.id}">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn plus" data-id="${item.id}">+</button>
        <button class="remove-btn" data-id="${item.id}" style="margin-left:10px">✕</button>
      </div>
    `;
    cartList.appendChild(li);
  });

  totalDisplay.textContent = total.toFixed(2);
}

// Updated Event Listener for the cart
cartList.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);
  if (e.target.classList.contains("plus")) {
    changeQty(id, 1);
  } else if (e.target.classList.contains("minus")) {
    changeQty(id, -1);
  } else if (e.target.classList.contains("remove-btn")) {
    removeFromCart(id);
  }
});



menuContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-btn")) {
    const id = Number(e.target.dataset.id);
    addToCart(id);
  }
});

cartList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const id = Number(e.target.dataset.id);
    removeFromCart(id);
  }
});

checkoutBtn.addEventListener("click", checkout);



function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const receiptBody = document.getElementById("receipt-body");
  const total = cart.reduce((sum, item) => sum + (item.qty * item.price), 0);

  let html = `<div style="border-bottom: 1px dashed #ccc; padding-bottom: 10px; margin-bottom: 10px;">`;
  
  cart.forEach(item => {
    html += `
      <div style="display: flex; justify-content: space-between;">
        <span>${item.name} x${item.qty}</span>
        <span>$${(item.qty * item.price).toFixed(2)}</span>
      </div>`;
  });

  html += `</div><div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.2rem;">
            <span>TOTAL</span>
            <span>$${total.toFixed(2)}</span>
          </div>`;

  receiptBody.innerHTML = html;
  document.getElementById("receipt-modal").style.display = "block";

  cart = [];
  updateCartUI();
}

function closeModal() {
  document.getElementById("receipt-modal").style.display = "none";
}

displayMenu();

function updateTime() {
    const clockElement = document.getElementById("live-clock");
    const now = new Date();
    
    const options = { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    
    clockElement.textContent = now.toLocaleString('en-US', options);
}

updateTime();
setInterval(updateTime, 1000);

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(id);
    } else {
      updateCartUI();
    }
  }
}

const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");

if (toggleBtn && sidebar) { 
    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");

        const content = document.querySelector(".tacodashboard-content") || document.querySelector("div[style]");
        if (sidebar.classList.contains("collapsed")) {
            content.style.marginLeft = "80px"; 
        } else {
            content.style.marginLeft = "220px"; 
        }
    });
}