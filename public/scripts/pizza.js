const menuContainer = document.getElementById("menuContainer");

const cart = [];
cartTotalItems = 0;

setTimeout(function () {
  document.getElementById("welcomeContainer").style.display = "flex";
}, 1000);
setTimeout(function () {
  document.getElementById("welcomeContainer").style.display = "none";
  const nextpage = document.getElementById("nextPage");
  nextpage.style.display = "block";
}, 4300);

pizzaData.forEach((item) => {
  const card = document.createElement("div");
  card.classList.add("card");
  cardInnerHtml = `
    <img
    src="${item.img}"
    alt="pizza"
    />
    <div class="nameContainer">
      <div class="name">${item.name}</div>

      <button id="add${item.id}" class="addBtn">Add</button>
      <div id="incrementBtn${item.id}" class="incrementBtn">
        <button id="dec${item.id}" class="dec">-</button>
        <div id="cartValue${item.id}">1</div>
        <button id="inc${item.id}" class="inc">+</button>
      </div>
    </div>
    <div class="price">	&#8377;${item.price * 66}</div>
    <div class="description">
        ${item.description}
    </div>
  `;

  card.innerHTML = cardInnerHtml;
  menuContainer.appendChild(card);
});

const buttons = document.querySelectorAll("button");

buttons.forEach(function (currentBtn) {
  currentBtn.addEventListener("click", handleEvent);
});

function handleEvent(e) {
  if (e.target.classList.contains("addBtn")) {
    updateCart(true);
    const currId = e.target.id;
    let matchesId = currId.match(/(\d+)/);
    pizzaData.forEach((item) => {
      if (item.id == matchesId[0]) {
        const isPresent = cart.some((cartItem) => {
          return cartItem.id === item.id;
        });
        if (!isPresent) {
          cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            img: item.img,
          });
        } else {
          cart.forEach((cartItem) => {
            if (cartItem.id === item.id) {
              cartItem.quantity++;
            }
          });
        }
        document.getElementById(`incrementBtn${item.id}`).style.display =
          "flex";
        btnValue(item.id, item.quantity);
      }
    });
    e.target.style.display = "none";
  } else if (e.target.classList.contains("inc")) {
    updateCart(true);
    const currId = e.target.id;
    let matchesId = currId.match(/(\d+)/);
    cart.forEach((item) => {
      if (item.id == matchesId[0]) {
        const updatedQty = ++item.quantity;
        btnValue(item.id, updatedQty);
      }
    });
  } else if (e.target.classList.contains("dec")) {
    const currId = e.target.id;
    let matchesId = currId.match(/(\d+)/);
    cart.forEach((item) => {
      if (item.id == matchesId[0] && item.quantity > 0) {
        const updatedQty = --item.quantity;
        btnValue(item.id, updatedQty);
        updateCart(false);
        if (item.quantity == 0) {
          document.getElementById(`incrementBtn${item.id}`).style.display =
            "none";
          document.getElementById(`add${item.id}`).style.display = "block";
        }
      }
    });
  }
}

function btnValue(id, qty) {
  document.getElementById(`cartValue${id}`).innerText = qty;
}

function updateCart(incrementValue) {
  if (incrementValue) {
    cartTotalItems++;
  } else {
    cartTotalItems--;
  }

  const displayCartTotal = document.getElementById("displayCartTotal");

  displayCartTotal.innerText = `${cartTotalItems} item${
    cartTotalItems > 1 ? "s" : ""
  } added`;

  const cartDisplay = document.getElementById("cartDisplay");

  if (cartTotalItems == 0) {
    cartDisplay.style.display = "none";
  } else {
    cartDisplay.style.display = "flex";
  }
}

function storeCartData() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
