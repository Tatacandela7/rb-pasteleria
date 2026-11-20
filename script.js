
// CARRITO DE COMPRAS

let carrito = [];

// ELEMENTOS DEL HTML

const botonesAgregar = document.querySelectorAll(
    ".tarjeta-producto .boton-carrito"
);

const selectorTorta = document.getElementById("tamano-torta");

const listaCarrito = document.getElementById("lista-carrito");

const botonFinalizar = document.getElementById("finalizar-pedido");


// AGREGAR PRODUCTOS DESDE EL CATALOGO

botonesAgregar.forEach((boton) => {

    boton.addEventListener("click", () => {

        const tarjeta = boton.closest(".tarjeta-producto");

        const nombre = tarjeta.querySelector("h3").textContent;

        let detalle = "";

        if (nombre === "Torta de chocolate") {

            detalle = selectorTorta.options[
                selectorTorta.selectedIndex
            ].textContent.split(" - ")[0];

        }

        agregarProducto(nombre, detalle, 1);

    });

});


// FUNCION GENERAL PARA AGREGAR PRODUCTOS

function agregarProducto(nombre, detalle, cantidad) {

    const productoExistente = carrito.find(
        (producto) =>
            producto.nombre === nombre &&
            producto.detalle === detalle
    );

    if (productoExistente) {

        productoExistente.cantidad += cantidad;

    } else {

        carrito.push({
            nombre: nombre,
            detalle: detalle,
            cantidad: cantidad
        });

    }

    actualizarCarrito();

}


// ACTUALIZAR EL CARRITO

function actualizarCarrito() {

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {

        listaCarrito.innerHTML =
            '<p class="carrito-vacio">Todavía no agregaste productos.</p>';

        return;

    }

    carrito.forEach((producto) => {

        listaCarrito.innerHTML += `
            <div class="producto-carrito">

                <h3>${producto.nombre}</h3>

                ${producto.detalle
                    ? `<p>Tamaño: ${producto.detalle}</p>`
                    : ""}

                <div class="controles-cantidad">

                    <button onclick="cambiarCantidad('${producto.nombre}', '${producto.detalle}', -1)">
                        -
                    </button>

                    <span>${producto.cantidad}</span>

                    <button onclick="cambiarCantidad('${producto.nombre}', '${producto.detalle}', 1)">
                        +
                    </button>

                    <button onclick="eliminarProducto('${producto.nombre}', '${producto.detalle}')">
                        Eliminar
                    </button>

                </div>

            </div>
        `;

    });

}


// CAMBIAR CANTIDAD

function cambiarCantidad(nombre, detalle, cambio) {

    const producto = carrito.find(
        (producto) =>
            producto.nombre === nombre &&
            producto.detalle === detalle
    );

    if (producto) {

        producto.cantidad += cambio;

        if (producto.cantidad <= 0) {

            eliminarProducto(nombre, detalle);

        } else {

            actualizarCarrito();

        }

    }

}


// ELIMINAR PRODUCTO

function eliminarProducto(nombre, detalle) {

    carrito = carrito.filter(
        (producto) =>
            producto.nombre !== nombre ||
            producto.detalle !== detalle
    );

    actualizarCarrito();

}


// FINALIZAR PEDIDO POR WHATSAPP

botonFinalizar.addEventListener("click", () => {

    if (carrito.length === 0) {

        alert("Tu carrito está vacío. Agregá algún producto primero.");

        return;

    }

    let mensaje =
        "¡Hola! Quiero realizar el siguiente pedido:\n\n";

    carrito.forEach((producto) => {

        mensaje +=
            `${producto.nombre}` +
            `${producto.detalle ? " - Tamaño: " + producto.detalle : ""}` +
            ` - Cantidad: ${producto.cantidad}\n`;

    });

    mensaje +=
        "\nQuisiera consultar el precio y la disponibilidad. ¡Gracias!";

    const telefono = "549XXXXXXXXXX";

    const url =
        `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

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


// ABRIR Y CERRAR FICHA DEL PRODUCTO

const botonesVerProducto = document.querySelectorAll(
    ".boton-ver-producto"
);

const detalleProducto = document.getElementById("detalle-producto");

const cerrarDetalle = document.getElementById("cerrar-detalle");

botonesVerProducto.forEach((boton) => {

    boton.addEventListener("click", () => {

        detalleProducto.hidden = false;

        document.body.style.overflow = "hidden";

    });

});

cerrarDetalle.addEventListener("click", () => {

    detalleProducto.hidden = true;

    document.body.style.overflow = "";

});

detalleProducto.addEventListener("click", (event) => {

    if (event.target === detalleProducto) {

        detalleProducto.hidden = true;

        document.body.style.overflow = "";

    }

});


// AGREGAR PRODUCTO DESDE SU FICHA

const selectorTortaDetalle = document.getElementById(
    "tamano-torta-detalle"
);

const cantidadTorta = document.getElementById("cantidad-torta");

const agregarDetalleCarrito = document.getElementById(
    "agregar-detalle-carrito"
);

agregarDetalleCarrito.addEventListener("click", () => {

    const nombre = "Torta de chocolate";

    const detalle = selectorTortaDetalle.options[
        selectorTortaDetalle.selectedIndex
    ].textContent.split(" - ")[0];

    const cantidad = Math.max(
        1,
        Number(cantidadTorta.value) || 1
    );

    agregarProducto(nombre, detalle, cantidad);

    detalleProducto.hidden = true;

    document.body.style.overflow = "";

    cantidadTorta.value = 1;

});
