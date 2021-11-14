
window.addEventListener('DOMContentLoaded', function () {
    // Variable donde se añadirán los artículo del carrito
    let produts = document.getElementById("products");
    // Método para tener la fecha actual con formato
    currentDate();
    // Usamos la función del padre para poder recuperar el valor de la cookie
    let jsonStringCart = window.opener.getCookie("cart");
    // Lo convertimos a JSON
    let myCart = JSON.parse(jsonStringCart);
    let totalPrice = 0;
    // Por cada artículo, generaremos un fila con sus respectivos atributos
    myCart.forEach(function (item) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.id}</td>
            <td><img src="${item.img}" alt="" height="70"></td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price} $</td>
            `;
        produts.append(tr);
        totalPrice += item.price * item.quantity;
    });
    // Por último añadimos el precio final, por seperado
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td></td>
        <td></td>
        <td></td>
        <td><b>Total</b></td>
        <td><b>${totalPrice} $</b></td>
    `;
    produts.appendChild(tr);

    // Elemento con evento que abrirá la ventana de imprimir del navegador
    // Después será el usuario quién decica qué hacer
    document.getElementById("btnPrint").addEventListener("click", function () {
        window.print();
        // Usaremos la función del padre para vacíar el carrito
        window.opener.emptyCart();
    });
    // Elemento con evento, que cierra la ventana
    document.getElementById("btnCancel").addEventListener("click", function () {
        window.close();
    });
});

// Manipula el elemento date del DOM para que tenga el formato esperado: Dia de la setmana dia DD , de/d’ MMMM del YYYY
function currentDate() {
    let dateDiv = document.getElementById("date");
    let date = new Date();
    let month = date.toLocaleString("default", { month: 'long' });
    let dayName = date.toLocaleString("default", { weekday: 'long' });
    let day = date.getDate();
    let year = date.getFullYear();
    dateDiv.innerText = `${dayName} day ${day}, of ${month} from ${year}`;
}
