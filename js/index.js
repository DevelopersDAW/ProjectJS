// Variables globales
var cart = [];
var shoppingCartTable;

window.addEventListener("DOMContentLoaded", function () {
    // Está variable es el carrito, donde añadimos los artículos
    shoppingCartTable = document.getElementById("myCartArticles");

    // Inicializaremos nuestro carrito al terminar de cargar la página
    loadMyCart();

    // Elemento con evento, al interactuar
    // con los botones del carrito, aumentar, reducir y eliminar
    document
        .getElementById("shoppingCart")
        .addEventListener("click", shoppingCart);

    // Estos elementos con evento, al pulsar sobre el botón añadir de los articulos
    document.getElementById("productsWomen").addEventListener("click", addToCart);
    document.getElementById("productsMan").addEventListener("click", addToCart);

    // Elemento con evento, que vacia el carrito
    document.getElementById("btnEmptyCart").addEventListener("click", emptyCart);

    // Elemento con evento, que abrirá una ventana mostrando la factura
    document
        .getElementById("btnCheckOut")
        .addEventListener("click", function () {
            // Solo cuando tengamos más de 1 artículo
            cart.length > 0 ? window.open("popup/popup.html", null, "width=1280,height=720") : "";
        });
});

// Funcion con el cual aumentamos o reducimos la cantidad de los articulos o eliminamos de este
// Manipulación del DOM para obtener el id del artículo y asi modificamos el producto
function shoppingCart(e) {
    if (e.target.classList.contains("plus")) {
        let id = e.target.parentNode.children[1].id;
        let index = findProduct(id);
        cart[index].quantity++;
    }
    if (e.target.classList.contains("minus")) {
        let id = e.target.parentNode.children[1].id;
        if (e.target.parentNode.children[1].value > 1) {
            let index = findProduct(id);
            cart[index].quantity--;
        }
    }
    if (e.target.classList.contains("trash")) {
        let id =
            e.target.parentNode.parentNode.children[1].children[0].children[2]
                .children[1].id;
        let index = findProduct(id);
        // Eliminamo el artículo clicado
        cart.splice(index, 1);
    }
    // Después de cada evento, actualizaremos nuestro carrito
    myCartStringified();
    updateCart();
}

// Funcíon con el cual añadiremos productos al carrito, dinámicamente. 
// En el caso de que añadamos 2 veces el mismo producto aumentaremos la cantidad
function addToCart(e) {
    if (e.target.classList.contains("addCart")) {
        let article = e.target;

        let id = article.id;
        let name = article.parentNode.children[1].innerText;
        let price = article.parentNode.children[2].innerText;
        price = price.replace("$", "");
        let img = e.target.parentNode.parentNode.children[0].children[0].src;

        let index = findProduct(id);
        // Si es diferente de -1 es que ya existe y solo incrementamos sino añadimos
        if (index != -1) {
            cart[index].quantity++;
        } else {
            cart.push({
                id: id,
                name: name,
                price: price,
                quantity: 1,
                img: img,
            });
        }
        // Después de cada evento, actualizaremos nuestro carrito
        myCartStringified();
        updateCart();
    }
}

// Función que actualizará los articulos del carrito, siempre usará los datos de la cookie.
// En caso de que no hayan elementos mostrará lo avisará
function updateCart() {
    shoppingCartTable.innerHTML = "";
    // Recogemos el valor de la cookie
    let jsonStringCart = getCookie("cart");
    // Lo convertimos a JSON
    let myCart = JSON.parse(jsonStringCart);
    let totalPrice = 0;
    if (myCart.length == 0) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <h6><strong>No articles in your cart :C</strong></h6>
            </td>
        `;
        shoppingCartTable.appendChild(tr);
    } else {
        // Por cada artículo, generaremos un fila con sus respectivos atributos
        myCart.forEach(function (article) {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td class="si-pic"><img src="${article.img}" alt="" height="75"></td>
                <td class="si-text">
                    <div class="product-selected">
                        <p>${article.price} x <span class="quantity">${article.quantity}</span></p>
                        <h6>${article.name}</h6>
                        <div class="number" style="display: flex;">
                            <span class="minus">-</span>
                            <input type="text" id="${article.id}" value="${article.quantity}"
                                style="width: 1.7rem; border: 0px;" />
                            <span class="plus">+</span>
                        </div>
                    </div>
                </td>
                <td class="si-close">
                    <i class="fas fa-trash trash" style="color: red;"></i>
                </td>
                `;
            // Desde aquí lo añadimos al elemento padre 
            shoppingCartTable.appendChild(tr);
            totalPrice += article.price * article.quantity;
        });
    }
    // Por último actualizaremos la cantidad total de los elementos del DOM
    document.getElementById("total-cart").innerText = "$ " + totalPrice;
    document.getElementById("totalCartNav").innerText = "$ " + totalPrice;
    document.getElementById("allItems").innerText = myCart.length;
}

// Vacía el carro y la cookie
function emptyCart() {
    cart = [];
    myCartStringified();
    updateCart();
}

// Recupera el valor de la cookie indicada, sino devovelverá nulo
function getCookie(name) {
    var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    if (match) return match[2];
    return null;
}

// Convierte el JSON a texto, para poder ser almacenado en la cookie
// Remplazará el valor de la cookie, para estar siempre actualizado
function myCartStringified() {
    let jsonStringCart = JSON.stringify(cart);
    document.cookie = "cart=" + jsonStringCart;
}

// Dado un id de artículo, recupera la posición del artículo del array cart
function findProduct(id) {
    let articleIgual = cart.find((element) => element.id == id);
    return cart.indexOf(articleIgual);
}

// Carga el array cart, sino existe la cookie lo dejará con valor vacío
function loadMyCart() {
    if (getCookie("cart") != null) {
        let myCartCookie = getCookie("cart");
        cart = JSON.parse(myCartCookie);
    } else {
        myCartStringified();
    }
    updateCart();
}