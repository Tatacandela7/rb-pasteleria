
// CARRITO DE COMPRAS

let carrito = [];

// BUSCAMOS LOS ELEMENTOS DEL HTML

const botonesAgregar = document.querySelectorAll(".boton-carrito");
// SELECTOR DE TAMAÑO DE LA TORTA

const selectorTorta = document.getElementById("tamano-torta");

const precioTorta = document.querySelector(
    ".tarjeta-producto .precio"
);

selectorTorta.addEventListener("change", () => {

    const nuevoPrecio = Number(selectorTorta.value);

    precioTorta.textContent =
        "$" + nuevoPrecio.toLocaleString("es-AR");

});

const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");

// AGREGAR PRODUCTOS

botonesAgregar.forEach((boton) => {

    boton.addEventListener("click", () => {

        const tarjeta = boton.closest(".tarjeta-producto");

        const nombre = tarjeta.querySelector("h3").textContent;

let precio;
let detalle = "";

// Si es la torta de chocolate, tomamos el tamaño elegido

if (nombre === "Torta de chocolate") {

    precio = Number(selectorTorta.value);

    detalle = selectorTorta.options[
        selectorTorta.selectedIndex
    ].textContent.split(" - ")[0];

} else {

    const precioTexto = tarjeta.querySelector(".precio").textContent;

    precio = Number(precioTexto.replace(/\D/g, ""));

}

       const productoExistente = carrito.find(
    (producto) =>
        producto.nombre === nombre &&
        producto.detalle === detalle
);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({
            nombre: nombre,
            detalle: detalle,
         precio: precio,
         cantidad: 1
}); 
        }

        actualizarCarrito();

    });

});

// ACTUALIZAR EL CARRITO

function actualizarCarrito() {

    listaCarrito.innerHTML = "";

    let total = 0;

    if (carrito.length === 0) {

        listaCarrito.innerHTML =
            '<p class="carrito-vacio">Todavía no agregaste productos.</p>';

    }

    carrito.forEach((producto) => {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        
listaCarrito.innerHTML += `
    <div class="producto-carrito">
        <h3>${producto.nombre}</h3>
        ${producto.detalle ? `<p>Tamaño: ${producto.detalle}</p>` : ""}

        <p>Subtotal: $${subtotal.toLocaleString("es-AR")}</p>

        <div class="controles-cantidad">

            <button onclick="cambiarCantidad('${producto.nombre}', -1)">
                -
            </button>

            <span>${producto.cantidad}</span>

            <button onclick="cambiarCantidad('${producto.nombre}', 1)">
                +
            </button>

            <button onclick="eliminarProducto('${producto.nombre}')">
                Eliminar
            </button>

        </div>
    </div>
`;


    });

    totalCarrito.textContent =
        "$" + total.toLocaleString("es-AR");

}

// CAMBIAR LA CANTIDAD DE UN PRODUCTO

function cambiarCantidad(nombre, cambio) {

    const producto = carrito.find(
        (producto) => producto.nombre === nombre
    );

    if (producto) {

        producto.cantidad += cambio;

        if (producto.cantidad <= 0) {
            eliminarProducto(nombre);
        } else {
            actualizarCarrito();
        }

    }

}


// ELIMINAR UN PRODUCTO

function eliminarProducto(nombre) {

    carrito = carrito.filter(
        (producto) => producto.nombre !== nombre
    );

    actualizarCarrito();

}

// FINALIZAR PEDIDO POR WHATSAPP

const botonFinalizar = document.getElementById("finalizar-pedido");

botonFinalizar.addEventListener("click", () => {

    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agregá algún producto primero.");
        return;
    }

    let mensaje = "¡Hola! Quiero realizar el siguiente pedido:\n\n";

    let total = 0;

    carrito.forEach((producto) => {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;
        
        mensaje += `${producto.nombre}${producto.detalle ? " - Tamaño: " + producto.detalle : ""} - Cantidad: ${producto.cantidad} - Subtotal: $${subtotal.toLocaleString("es-AR")}\n`;


    });

    mensaje += `\nTOTAL: $${total.toLocaleString("es-AR")}`;

    const telefono = "549XXXXXXXXXX";

    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");

});


 // FILTRAR PRODUCTOS POR CATEGORIA

const categorias = document.querySelectorAll(".tarjeta-categoria");
const productos = document.querySelectorAll(".tarjeta-producto");

categorias.forEach((categoria) => {

    categoria.addEventListener("click", () => {

        const categoriaElegida = categoria.dataset.categoria;

        productos.forEach((producto) => {

            if (producto.dataset.categoria === categoriaElegida) {
                producto.style.display = "block";
            } else {
                producto.style.display = "none";
            }

        });

        const titulo = document.querySelector(
            "#productos .titulo-seccion h2"
        );

        titulo.textContent =
            categoria.querySelector("h3").textContent;

    });

});

