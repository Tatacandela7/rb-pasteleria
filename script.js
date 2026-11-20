
// ========================================
// DATOS DE LOS PRODUCTOS
// ========================================

const productosDetalle = {
    "torta-chocolate": {
        nombre: "Torta de chocolate",
        descripcion: "Deliciosa torta con decoración artesanal, ideal para disfrutar en cualquier ocasión.",
        imagenes: [
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&sat=-20",
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&fit=crop"
        ]
    },

    "tarta-frutas": {
        nombre: "Tarta de frutas",
        descripcion: "Base crocante con crema y frutas frescas, elaborada artesanalmente.",
        imagenes: [
            "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800",
            "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&sat=-20",
            "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&fit=crop"
        ]
    },

    "postres-shots": {
        nombre: "Postres shots",
        descripcion: "Pequeños postres ideales para compartir y disfrutar en cualquier momento.",
        imagenes: [
            "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800",
            "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&sat=-20",
            "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&fit=crop"
        ]
    },

    "cupcakes": {
        nombre: "Cupcakes",
        descripcion: "Pequeñas creaciones dulces y artesanales, preparadas con mucho amor.",
        imagenes: [
            "https://images.unsplash.com/photo-1426869981800-95ebf51ce900?w=800",
            "https://images.unsplash.com/photo-1426869981800-95ebf51ce900?w=800&sat=-20",
            "https://images.unsplash.com/photo-1426869981800-95ebf51ce900?w=800&fit=crop"
        ]
    }
};


// ========================================
// CARRITO DE COMPRAS
// ========================================

let carrito = [];

const botonesAgregar = document.querySelectorAll(
    ".tarjeta-producto .boton-carrito"
);

const listaCarrito = document.getElementById("lista-carrito");
const botonFinalizar = document.getElementById("finalizar-pedido");


// AGREGAR PRODUCTOS AL CARRITO

botonesAgregar.forEach((boton) => {

    boton.addEventListener("click", () => {

        const tarjeta = boton.closest(".tarjeta-producto");

        const nombre = tarjeta.querySelector("h3").textContent.trim();

        agregarProducto(nombre);

    });

});


// FUNCION PARA AGREGAR UN PRODUCTO

function agregarProducto(nombre) {

    const productoExistente = carrito.find(
        producto => producto.nombre === nombre
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


// ACTUALIZAR EL CONTENIDO DEL CARRITO

function actualizarCarrito() {

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {

        listaCarrito.innerHTML = `
            <p class="carrito-vacio">
                Todavía no agregaste productos.
            </p>
        `;

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


// CAMBIAR LA CANTIDAD DE UN PRODUCTO

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


// ELIMINAR UN PRODUCTO

function eliminarProducto(indice) {

    carrito.splice(indice, 1);

    actualizarCarrito();

}


// ========================================
// ENVIAR PEDIDO POR WHATSAPP
// ========================================

botonFinalizar.addEventListener("click", () => {

    if (carrito.length === 0) {

        alert("Tu pedido está vacío. Agregá algún producto primero.");

        return;

    }

    let mensaje = "¡Hola! Quiero realizar el siguiente pedido:\n\n";

    carrito.forEach((producto) => {

        mensaje += `${producto.nombre} - Cantidad: ${producto.cantidad}\n`;

    });

    mensaje += "\nQuisiera consultar precios y disponibilidad. ¡Gracias!";

    const telefono = "5491170347149";

    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");

});


// ========================================
// FILTRO DE CATEGORIAS
// ========================================

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

        titulo.textContent = categoria.querySelector("h3").textContent;

    });

});


// ========================================
// FICHAS INDIVIDUALES DE PRODUCTOS
// ========================================

const botonesVerProducto = document.querySelectorAll(
    ".boton-ver-producto"
);

const detalleProducto = document.getElementById("detalle-producto");

const cerrarDetalle = document.getElementById("cerrar-detalle");

const tituloDetalle = document.getElementById("titulo-detalle");

const descripcionDetalle = document.getElementById("descripcion-detalle");

const consultarWhatsApp = document.getElementById("consultar-whatsapp");

const imagenDetalle1 = document.getElementById("imagen-detalle-1");

const imagenDetalle2 = document.getElementById("imagen-detalle-2");

const imagenDetalle3 = document.getElementById("imagen-detalle-3");


// ABRIR LA FICHA DEL PRODUCTO SELECCIONADO

botonesVerProducto.forEach((boton) => {

    boton.addEventListener("click", () => {

        const identificador = boton.dataset.producto;

        const producto = productosDetalle[identificador];

        if (!producto) return;

        tituloDetalle.textContent = producto.nombre;

        descripcionDetalle.textContent = producto.descripcion;

        imagenDetalle1.src = producto.imagenes[0];

        imagenDetalle2.src = producto.imagenes[1];

        imagenDetalle3.src = producto.imagenes[2];

        consultarWhatsApp.href =
            `https://wa.me/5491170347149?text=${encodeURIComponent(
                "Hola, quiero consultar por " + producto.nombre + ". ¿Me podrían informar el precio y la disponibilidad? Gracias."
            )}`;

        detalleProducto.hidden = false;

        document.body.style.overflow = "hidden";

    });

});


// CERRAR LA FICHA

cerrarDetalle.addEventListener("click", () => {

    detalleProducto.hidden = true;

    document.body.style.overflow = "";

});


// CERRAR AL TOCAR FUERA DE LA FICHA

detalleProducto.addEventListener("click", (event) => {

    if (event.target === detalleProducto) {

        detalleProducto.hidden = true;

        document.body.style.overflow = "";

    }

});
