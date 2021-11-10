
var carts = [];
var shoppingCart;

document.addEventListener("DOMContentLoaded", function () {
    shoppingCart = document.getElementById("cart-articles");
    document.getElementById("productsWomen").addEventListener("click", addToCart);
    document.getElementById("productsMan").addEventListener("click", addToCart);
});

function addToCart(e) {
    if (e.target.classList.contains("addCart")) {
        let producto = e.target;

        let id = producto.id;
        let name = producto.parentNode.children[1].innerText;
        let price = producto.parentNode.children[2].innerText;
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
        updateCart();
        
    }
}

function updateCart() {
    shoppingCart.innerHTML = "";
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
                        <input type="text" value="${item.quantity}"
                            style="width: 1.7rem; border: 0px;" />
                        <span class="plus">+</span>
                    </div>
                </div>
            </td>
            <td class="si-close">
                <i class="fas fa-trash trash" style="color: red;"></i>
            </td>
            `;
        shoppingCart.append(tr);
    });
    document.getElementById("allItems").innerText = carts.length;
}