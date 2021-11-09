var carts = [];

document.addEventListener("DOMContentLoaded", function () {
    console.log("HOLA");
    let productos = document.getElementById("productos");
    productos.addEventListener("click", addToCart);


});

function addToCart(e) {

    if (e.target.classList.contains("addCart")) {
        let producto = e.target;

        let id = producto.id;
        let name = producto.parentNode.children[1].innerText;
        let price = producto.parentNode.children[2].innerText;

        console.log("AÑADIDO el producto con ID: " + id);
        console.log("NOMBRE: " + name);
        console.log("PRECIO: " + price);
        
        let productoIgual = carts.find(element => element.id == id);
        let index = carts.indexOf(productoIgual);

        if(productoIgual != null){
            console.log("YA EXISTE!");
            carts[index].quantity++;
            console.log(carts[index].quantity);
        } else {
            carts.push({
                id: id,
                name: name,
                price: price,
                quantity: 1
            });
        }

    }

    

}

