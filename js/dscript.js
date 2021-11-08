document.addEventListener("DOMContentLoaded", function () {
    console.log("HOLA");
    let productos = document.getElementById("productos");
    productos.addEventListener("click", addToCart);


});

function addToCart(e) {

    if (e.target.classList.contains("addCart")) {
        let producto = e.target;
        console.log("AÑADIDO el producto con ID: " + producto.id);
        console.log("NOMBRE: " + producto.parentNode.children[1].innerText);
        console.log("PRECIO: " + producto.parentNode.children[2].innerText);

    }

}
