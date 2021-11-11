var carts = [];
var shoppingCart;

window.addEventListener('DOMContentLoaded', function () {
    document.getElementById("shopping-cart").addEventListener("click", shoppingCart);
    shoppingCart = document.getElementById("cart-articles");
    if (carts.length == 0) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <td>
        <h6><strong>No articles in your cart :C</strong></h6>
        </td>
        `;
        shoppingCart.append(tr);
    }
    document.getElementById("productsWomen").addEventListener("click", addToCart);
    document.getElementById("productsMan").addEventListener("click", addToCart);
    document.getElementById("btnEmptyCart").addEventListener("click", emptyCart);
    document.getElementById("btnCheckOut").addEventListener("click",generatePopup)
});

function shoppingCart(e) {
    if (e.target.classList.contains("plus")) {
        let id = e.target.parentNode.children[1].id;
        let productoIgual = carts.find(element => element.id == id);
        let index = carts.indexOf(productoIgual);
        carts[index].quantity++;
        ArrayToString();
    }
    if (e.target.classList.contains("minus")) {
        let id = e.target.parentNode.children[1].id;
        if (e.target.parentNode.children[1].value > 1) {
            let productoIgual = carts.find(element => element.id == id);
            let index = carts.indexOf(productoIgual);
            carts[index].quantity--;
            ArrayToString();
        }
    }
    if (e.target.classList.contains("trash")) {
        // e.target.parentNode.parentNode.remove();
        let id = e.target.parentNode.parentNode.children[1].children[0].children[2].children[1].id;
        let productoIgual = carts.find(element => element.id == id);
        let index = carts.indexOf(productoIgual);
        carts.splice(index, 1);
        ArrayToString();
    }
    updateCart();
}

function addToCart(e) {
    if (e.target.classList.contains("addCart")) {
        let producto = e.target;

        let id = producto.id;
        let name = producto.parentNode.children[1].innerText;
        let price = producto.parentNode.children[2].innerText;
        price = price.replace("$", "");
        let img = e.target.parentNode.parentNode.children[0].children[0].src;

        let productoIgual = carts.find(element => element.id == id);
        let index = carts.indexOf(productoIgual);

        if (productoIgual != null) {
            carts[index].quantity++;
        } else {
            carts.push({
                id: id,
                name: name,
                price: price,
                quantity: 1,
                img: img
            });
        }
        ArrayToString();
        updateCart();
    }
}

function updateCart() {
    shoppingCart.innerHTML = "";
    let totalPrice = 0;
    carts.forEach(function (item) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="si-pic"><img src="${item.img}" alt="" height="75"></td>
            <td class="si-text">
                <div class="product-selected">
                    <p>${item.price} x <span class="quantity">${item.quantity}</span></p>
                    <h6>${item.name}</h6>
                    <div class="number" style="display: flex;">
                        <span class="minus">-</span>
                        <input type="text" id="${item.id}" value="${item.quantity}"
                            style="width: 1.7rem; border: 0px;" />
                        <span class="plus">+</span>
                    </div>
                </div>
            </td>
            <td class="si-close">
                <i class="fas fa-trash trash"   style="color: red;"></i>
            </td>
            `;
        shoppingCart.append(tr);
        // console.log(item.price);
        totalPrice += item.price * item.quantity;
    });
    if (carts.length == 0) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <td>
        <h6><strong>No articles in your cart :C</strong></h6>
    </td>
        `;
        shoppingCart.append(tr);
    }
    document.getElementById("total-cart").innerText = "$ " + totalPrice;
    document.getElementById("totalCartNav").innerText = "$ " + totalPrice;
    document.getElementById("allItems").innerText = carts.length;
    // console.log(carts);
}

function emptyCart() {
    carts = [];
    updateCart();
}

function generatePopup(){
    window.open("../popup.html", null, "height=600,width=600");
}

function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}

function ArrayToString(){
    let jsonStringCart = JSON.stringify(carts);
    document.cookie = "cart=" + jsonStringCart;
}