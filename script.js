
// =====================================
// CARRITO DE COMPRAS
// =====================================

let carrito = [];

const botonesAgregar = document.querySelectorAll(
    ".tarjeta-producto .boton-carrito"
);

const listaCarrito = document.getElementById("lista-carrito");

const botonFinalizar = document.getElementById("finalizar-pedido");


// =====================================
// AGREGAR PRODUCTOS AL CARRITO
// =====================================

botonesAgregar.forEach((boton) => {

    boton.addEventListener("click", () => {

        const tarjeta = boton.closest(".tarjeta-producto");

        const nombre = tarjeta.querySelector("h3").textContent.trim();

        agregarProducto(nombre);

    });

});


// =====================================
// FUNCION PARA AGREGAR UN PRODUCTO
// =====================================

function agregarProducto(nombre) {

    const productoExistente = carrito.find(
        (producto) => producto.nombre === nombre
    );

    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({
            nombre: nombre,
            cantidad: 1
        });

    }

    actualizarCarrito();

}


// =====================================
// ACTUALIZAR EL CARRITO
// =====================================

function actualizarCarrito() {

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {

        listaCarrito.innerHTML =
            '<p class="carrito-vacio">Todavía no agregaste productos.</p>';

        return;

    }

    carrito.forEach((producto, indice) => {

        listaCarrito.innerHTML += `
            <div class="producto-carrito">

                <h3>${producto.nombre}</h3>

                <div class="controles-cantidad">

                    <button onclick="cambiarCantidad(${indice}, -1)">
                        -
                    </button>

                    <span>${producto.cantidad}</span>

                    <button onclick="cambiarCantidad(${indice}, 1)">
                        +
                    </button>

                    <button onclick="eliminarProducto(${indice})">
                        Eliminar
                    </button>

                </div>

            </div>
        `;

    });

}


// =====================================
// CAMBIAR CANTIDAD
// =====================================

function cambiarCantidad(indice, cambio) {

    const producto = carrito[indice];

    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {

        eliminarProducto(indice);

    } else {

        actualizarCarrito();

    }

}


// =====================================
// ELIMINAR PRODUCTO
// =====================================

function eliminarProducto(indice) {

    carrito.splice(indice, 1);

    actualizarCarrito();

}


// =====================================
// ENVIAR PEDIDO POR WHATSAPP
// =====================================

botonFinalizar.addEventListener("click", () => {

    if (carrito.length === 0) {

        alert("Tu pedido está vacío. Agregá algún producto primero.");

        return;

    }

    let mensaje =
        "¡Hola! Quiero realizar el siguiente pedido:\n\n";

    carrito.forEach((producto) => {

        mensaje +=
            `${producto.nombre} - Cantidad: ${producto.cantidad}\n`;

    });

    mensaje +=
        "\nQuisiera consultar precios y disponibilidad. ¡Gracias!";

    const telefono = "549XXXXXXXXXX";

    const url =
        `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");

});


// =====================================
// FILTRAR PRODUCTOS POR CATEGORIA
// =====================================

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


// =====================================
// ABRIR Y CERRAR FICHA DEL PRODUCTO
// =====================================

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
