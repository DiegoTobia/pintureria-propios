const productos_a_comprar = JSON.parse(localStorage.getItem("productos_a_comprar")) || [];

KprecioMax = 8000;

const pinturas_random = [
    {
        id:"raso1",
        img: "../img/cielo_raso.png",
        descripcion: "CIELOS RASOS INCA - 5.0LT",
        atributo: "exterior",
        marca: "INCA",
        alt:"pintura para cielo raso",
        precio: 5099,
    },
    {
        id:"antioxido1",
        img: "../img/antioxido.png",
        descripcion: "ANTIOXIDO INCA - 3.2LT",
        atributo: "exterior",
        marca: "INCA",
        alt:"pintura antioxido",
        precio: 4249,
    },
    {
        id:"impermiable1",
        img: "../img/membrana.png",
        descripcion: "MEMBRANA IMPERMIABLE - 4.0LT",
        atributo: "exterior",
        marca: "INCA",
        alt:"pintura impermiabilizante",
        precio: 7200,
    },
    {
        id:"pisos1",
        img: "../img/pisos.png",
        descripcion: "PISOS - 2.5LT",
        atributo: "pisos",
        marca: "INCA",
        alt:"pintura para pisos",
        precio: 1999,
    }
];
let pinturas_mostrar = JSON.parse(localStorage.getItem("ordenar_select")) ||  pinturas_random;

let contenedorPinturas = document.querySelector("#prod-ventas");
let selectElement = document.getElementById('ordenar_select');

//###################################3###################################

const checkboxes_catego = [
    document.getElementById("form_Agua"),
    document.getElementById("form_Exterior"),
    document.getElementById("form_Pisos")
];

const checkboxes_marcas = [
    document.getElementById("form_Inca"),
    document.getElementById("form_Pintelux"),
];

const form_precio_min = document.getElementById("form_precio_min");
const form_precio_max = document.getElementById("form_precio_max");

//###################################3###################################

function getNumericValue(value, defaultValue) {
    // Convierte el valor a número y usa defaultValue si es `NaN`
    const numericValue = parseFloat(value);
    return isNaN(numericValue) ? defaultValue : numericValue;
}

function filtrarPorRangoDePrecios() {

    const precio_min = getNumericValue(form_precio_min.value, 0); // 0 como valor por defecto
    const precio_max = getNumericValue(form_precio_max.value, KprecioMax);

    // Asegurarse de que el precio mínimo no sea mayor que el máximo
    if (parseFloat(precio_min) > parseFloat(precio_max)) {
        form_precio_max.value = form_precio_min.value;
    }

    // Filtrar productos por el rango de precios
    let productosFiltrados = JSON.parse(localStorage.getItem("ordenar_select")) ||  pinturas_random;
    productosFiltrados = productosFiltrados.filter(
        (producto) => producto.precio >= precio_min && producto.precio <= precio_max
    );

    // Renderizar los productos filtrados
    /*contenedorPinturas.innerHTML = "";

    productosFiltrados.forEach((producto) => {
        const li = document.createElement("li");
        li.classList.add("imgs-productos");
        li.innerHTML = `
            <img src="${producto.img}" class="radio" alt="${producto.alt}">
            <p class="t-prod">${producto.descripcion}</p>
            <p class="t-prod precio">$${producto.precio}</p>
        `;

        const boton = document.createElement("button");
        boton.classList.add("boton-carrito");
        boton.innerText = "Añadir al carrito";
        // Agregar lógica para añadir al carrito si es necesario
        li.appendChild(boton);

        contenedorPinturas.appendChild(li);
    });*/
    return productosFiltrados;
}

// Función para filtrar y mostrar los productos según los checkboxes seleccionados
function filtrarYMostrarProductos() {

    // Obtener las categorías y marcas seleccionadas
    const categoriasSeleccionadas = checkboxes_catego
        .filter(checkbox => checkbox.checked && checkbox.id.startsWith("form_"))
        .map(checkbox => checkbox.id.split("_")[1].toLowerCase());

    const marcasSeleccionadas = checkboxes_marcas
    .filter(checkbox => checkbox.checked && checkbox.id.startsWith("form_"))
    .map(checkbox => checkbox.id.split("_")[1].toLowerCase());

    // Filtrar el array por las categorías seleccionadas
    let productosFiltrados = filtrarPorRangoDePrecios(); //JSON.parse(localStorage.getItem("ordenar_select")) ||  pinturas_random;
    if (categoriasSeleccionadas.length > 0) {
        productosFiltrados = productosFiltrados.filter(
            producto =>
                categoriasSeleccionadas.includes(producto.atributo.toLowerCase())
        );
    }
    if (marcasSeleccionadas.length > 0) {

        productosFiltrados = productosFiltrados.filter(
            producto =>
            marcasSeleccionadas.includes(producto.marca.toLowerCase())
        );
        
    }

    // Limpiar el contenedor de pinturas
    contenedorPinturas.innerHTML = "";

    // Renderizar los productos filtrados
    productosFiltrados.forEach((pintura) => {
        let lit = document.createElement("li");
        lit.classList.add("imgs-productos");
        lit.innerHTML = `
            <img src="${pintura.img}" class="radio" alt="${pintura.alt}"> 
            <p class="t-prod">"${pintura.descripcion}"</p>
            <p class="t-prod precio">$"${pintura.precio}"</p>
        `;
        /*<button class="boton-carrito">Añadir al carrito</button>*/

        let comprar = document.createElement("button");
        comprar.classList.add("boton-carrito");
        comprar.innerText = "Añadir al carrito";
        comprar.addEventListener("click", () => {
            agregar_compra(pintura);
        });

        lit.append(comprar);

        contenedorPinturas.append(lit);
    });

    // Guardar en localStorage el resultado del filtro
    //localStorage.setItem("ordenar_select", JSON.stringify(productosFiltrados));
}

// Agregar eventos a los checkboxes para que ejecuten la función de filtrado cuando cambien
checkboxes_catego.forEach((checkbox) => {
    checkbox.addEventListener("change", filtrarYMostrarProductos);
});
checkboxes_marcas.forEach((checkbox) => {
    checkbox.addEventListener("change", filtrarYMostrarProductos);
});

// Mostrar los productos filtrados por primera vez (esto manejará el estado inicial del localStorage)
//filtrarYMostrarProductos();

// Escuchar eventos de cambio para ambos inputs
form_precio_min.addEventListener("change", filtrarYMostrarProductos);
form_precio_max.addEventListener("change", filtrarYMostrarProductos);

// Mostrar productos filtrados según el rango de precios inicial
//filtrarYMostrarProductos(); // Para manejar el estado inicial del localStorage si es necesario

//###################################3###################################

const carritoSeccion = document.getElementById("carrito-seccion");
        
// Función para mostrar el carrito
function mostrarCarrito() {
    carritoSeccion.classList.add("show");
}

// Función para ocultar el carrito
function ocultarCarrito() {
    carritoSeccion.classList.remove("show");
}

// Agregar función para alternar el carrito
function alternarCarrito() {
    carritoSeccion.classList.toggle("show");
}

document.getElementById("mostrar-carrito").addEventListener("click", mostrarCarrito);

//##############################################################################


const ordenar_productos = (orden, pinturas_filtros) => {
    const copiaArray = [...pinturas_filtros];
    if (orden=="menor_p" || orden=="descuento"){
        copiaArray.sort((a, b) => a.precio - b.precio);
    }else if (orden=="mayor_p"){
        copiaArray.sort((a, b) => b.precio - a.precio);
    }

    localStorage.setItem("ordenar_select", JSON.stringify(copiaArray));

    return copiaArray
}

selectElement.addEventListener('change', function() {
    const valorSeleccionado = selectElement.value;
    /*si es por categoria o recomendado aun no hago nada, hay 4 productos*/
    pinturas_mostrar = ordenar_productos(valorSeleccionado, pinturas_random);
    

    contenedorPinturas.innerHTML = "";

    pinturas_mostrar.forEach((pintura) => {
        let lit = document.createElement("li");
        lit.classList.add("imgs-productos");
        lit.innerHTML = `
            <img src="${pintura.img}" class="radio" alt="${pintura.alt}"> 
            <p class="t-prod">"${pintura.descripcion}"</p>
            <p class="t-prod precio">$"${pintura.precio}"</p>
        `;
        /*<button class="boton-carrito">Añadir al carrito</button>*/
    
        let comprar = document.createElement("button");
        comprar.classList.add("boton-carrito");
        comprar.innerText = "Añadir al carrito";
        comprar.addEventListener("click", () => {
            agregar_compra(pintura);
        });
    
        lit.append(comprar);
    
        contenedorPinturas.append(lit);
    })

})

pinturas_mostrar.forEach((pintura) => {
    let lit = document.createElement("li");
    lit.classList.add("imgs-productos");
    lit.innerHTML = `
        <img src="${pintura.img}" class="radio" alt="${pintura.alt}"> 
        <p class="t-prod">"${pintura.descripcion}"</p>
        <p class="t-prod precio">$"${pintura.precio}"</p>
    `;
    /*<button class="boton-carrito">Añadir al carrito</button>*/

    let comprar = document.createElement("button");
    comprar.classList.add("boton-carrito");
    comprar.innerText = "Añadir al carrito";
    comprar.addEventListener("click", () => {
        agregar_compra(pintura);
    });

    lit.append(comprar);

    contenedorPinturas.append(lit);

})

const carrito_vacio = document.querySelector("#carrito-vacio");
const carrito_productos = document.querySelector("#carrito-productos");
const carrito_total = document.querySelector("#carrito-total");

const actulizar_carrito = () => {
    if (productos_a_comprar.length===0){
        carrito_vacio.classList.remove("d-none");
        carrito_productos.classList.add("d-none");
    }else{
        carrito_vacio.classList.add("d-none");
        carrito_productos.classList.remove("d-none");

        carrito_productos.innerHTML = "";
        productos_a_comprar.forEach((pintura) => {
            let div = document.createElement("div");
            div.classList.add("prod-carrito");
            div.innerHTML = `
                <img src="${pintura.img}" class="img-carrito" alt="${pintura.alt}"> 
                <p class="t-prod">"${pintura.descripcion}"</p>
                <p class="t-prod precio">$"${pintura.precio}"</p>
            `; // <p>Cant: ${pintura.cantidad}</p>
            let agrgar_uno = document.createElement("button");
            agrgar_uno.classList.add("input");
            agrgar_uno.innerText = "+";
            agrgar_uno.addEventListener("click", () => {
                agregar_uno_mas(pintura);
            });
            div.append(agrgar_uno);

            let cantidad = document.createElement("p");
            cantidad.innerText = `Cant: ${pintura.cantidad}`;
            div.append(cantidad);

            let sacar_uno = document.createElement("button");
            sacar_uno.classList.add("input");
            sacar_uno.innerText = "-";
            sacar_uno.addEventListener("click", () => {
                sacar_uno_mas(pintura);
            });
            div.append(sacar_uno);

            let cancelar = document.createElement("button");
            cancelar.classList.add("input");
            cancelar.innerText = "Cancelar";
            cancelar.addEventListener("click", () => {
                borrar_del_carrito(pintura);
            });

            div.append(cancelar);
            carrito_productos.append(div);

        })
    }
    actualizar_total();
    localStorage.setItem("productos_a_comprar", JSON.stringify(productos_a_comprar))
}

const agregar_compra = (pintura) => {
    const item_repetido = productos_a_comprar.find(item => item.id === pintura.id);
    if (item_repetido){
        item_repetido.cantidad++;
    }else{
        productos_a_comprar.push({...pintura, cantidad:1});
    }
    console.log(productos_a_comprar)

    actulizar_carrito();
    mostrarCarrito();
}

const borrar_del_carrito = (pintura) => {
    const index_pintura = productos_a_comprar.findIndex(item => item.id === pintura.id);
    productos_a_comprar.splice(index_pintura, 1);

    actulizar_carrito();
}

const agregar_uno_mas = (pintura) => {
    const prod_pintura = productos_a_comprar.find(item => item.id === pintura.id);
    prod_pintura.cantidad++;

    actulizar_carrito();
}

const sacar_uno_mas = (pintura) => {
    const prod_pintura = productos_a_comprar.find(item => item.id === pintura.id);
    if (prod_pintura.cantidad==1){
        borrar_del_carrito(pintura);
    }else{
        prod_pintura.cantidad--;
    }

    actulizar_carrito();
}

const actualizar_total = () => {
    let total = productos_a_comprar.reduce((acc, pint) => acc + (pint.precio * pint.cantidad), 0);
    carrito_total.innerHTML = `$${total}`;
}

actulizar_carrito();

//##############################################################################

const central = document.querySelector(".central"); 

//central.addEventListener("click", ocultarCarrito);

central.addEventListener("click", function(event) {
    if (!event.target.closest(".boton-carrito")) { // Si no es el botón "agregar al carrito"
        ocultarCarrito(); // Cerramos el carrito
    }
});
