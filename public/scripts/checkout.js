const cartProductsContainer = document.getElementById("cartProductsContainer");
let cart = JSON.parse(localStorage.getItem("cart"));
const totalDisplay = document.getElementById("total");
let total = 0;

setTimeout(function () {
  document.getElementById("loadingContainer").style.display = "none";
  document.getElementById("checkoutContainer").style.display = "block";
}, 4300);

function renderCartProducts() {
  cart.forEach((item) => {
    if (item.quantity > 0) {
      const productdiv = document.createElement("div");
      productdiv.classList.add("product");
      total += item.price * 66 * item.quantity;
      const card = `
      <img class="product-image" src="${item.img}" alt="pizza" />
      <div class="product-name">${item.name}</div>
      
      <div  class="incrementBtn product-qty">
        <button  class="dec">-</button>
        <div>${item.quantity}</div>
        <button class="inc">+</button>
      </div>

      <div class="product-price">&#8377; <span>${
        item.price * 66 * item.quantity
      }</span></div>
      <div style="font-size:24px;color:red;cursor:pointer;" onclick="removeElement()">&#215;</div>
    `;
      productdiv.innerHTML = card;
      cartProductsContainer.appendChild(productdiv);
    }
  });
  totalDisplay.innerText = "₹ " + total;
}
renderCartProducts();

function removeElement() {
  e = window.event;
  const parent = e.target.parentElement;
  const displayedVal = parent.childNodes[7].innerText;

  let matchesId = displayedVal.match(/(\d+)/);
  total -= matchesId[0];
  totalDisplay.innerText = "₹ " + total;

  const productName = parent.childNodes[3].innerText;
  parent.remove();
  cart.forEach((item) => {
    if (item.name === productName) {
      item.quantity = 0;
    }
  });
}

const buttons = document.querySelectorAll("button");

buttons.forEach(function (currentBtn) {
  currentBtn.addEventListener("click", handleEvent);
});

function handleEvent(e) {
  const buttonParent = e.target.parentElement;
  const productParent = buttonParent.parentElement;
  const currentProductName = productParent.childNodes[3].innerText;
  const currPrice = productParent.childNodes[7].childNodes[1];
  if (e.target.classList.contains("inc")) {
    cart.forEach((item) => {
      if (item.name === currentProductName) {
        item.quantity++;
        currPrice.innerText = item.price * 66 + Number(currPrice.innerText);
        buttonParent.childNodes[3].innerText = item.quantity;
        total = total + item.price * 66;
        totalDisplay.innerText = "₹ " + total;
      }
    });
  } else if (e.target.classList.contains("dec")) {
    cart.forEach((item) => {
      if (item.name === currentProductName && item.quantity > 1) {
        item.quantity--;
        currPrice.innerText = Number(currPrice.innerText) - item.price * 66;
        total -= item.price * 66;
        totalDisplay.innerText = "₹ " + total;

        buttonParent.childNodes[3].innerText = item.quantity;
      } else if (item.name === currentProductName && item.quantity == 1) {
        item.quantity--;
        buttonParent.parentElement.remove();
        total -= item.price * 66;

        totalDisplay.innerText = "₹ " + total;
      }
    });
  }
}

const delivery = document.getElementById("delivery");

const eta = Math.floor(Math.random() * 30 + 29);
localStorage.setItem("eta", eta);
delivery.innerText = `🕓 Estimated Delivery time: ${eta}mins`;

document
  .getElementsByClassName("pay-form")[0]
  .addEventListener("submit", (e) => {
    e.target.childNodes[3].value = Number(total);
    console.log(e.target.childNodes[3].value);
  });
