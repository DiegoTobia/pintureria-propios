const productos_a_comprar = JSON.parse(localStorage.getItem("productos_a_comprar")) || [];

const pinturas_random = [
    {
        id:"raso1",
        img: "../img/cielo_raso.png",
        descripcion: "CIELOS RASOS INCA - 5.0LT",
        alt:"pintura para cielo raso",
        precio: 5099,
    },
    {
        id:"antioxido1",
        img: "../img/antioxido.png",
        descripcion: "ANTIOXIDO INCA - 3.2LT",
        alt:"pintura antioxido",
        precio: 4249,
    },
    {
        id:"impermiable1",
        img: "../img/membrana.png",
        descripcion: "MEMBRANA IMPERMIABLE - 4.0LT",
        alt:"pintura impermiabilizante",
        precio: 7200,
    },
    {
        id:"pisos1",
        img: "../img/pisos.png",
        descripcion: "PISOS - 2.5LT",
        alt:"pintura para pisos",
        precio: 1999,
    }
];
const pinturas_precio_mayor= [
    {
        id:"impermiable1",
        img: "../img/membrana.png",
        descripcion: "MEMBRANA IMPERMIABLE - 4.0LT",
        alt:"pintura impermiabilizante",
        precio: 7200,
    },
    {
        id:"raso1",
        img: "../img/cielo_raso.png",
        descripcion: "CIELOS RASOS INCA - 5.0LT",
        alt:"pintura para cielo raso",
        precio: 5099,
    },
    {
        id:"antioxido1",
        img: "../img/antioxido.png",
        descripcion: "ANTIOXIDO INCA - 3.2LT",
        alt:"pintura antioxido",
        precio: 4249,
    },
    {
        id:"pisos1",
        img: "../img/pisos.png",
        descripcion: "PISOS - 2.5LT",
        alt:"pintura para pisos",
        precio: 1999,
    }
];
const pinturas_precio_menor = pinturas_precio_mayor.slice().reverse();
let pinturas_mostrar = pinturas_random;

let contenedorPinuras = document.querySelector("#prod-ventas");
let selectElement = document.getElementById('ordenar_select');

let form_Agua = document.getElementById('form_Agua');
let form_Exterior = document.getElementById('form_Exterior');
let form_Pisos = document.getElementById('form_Pisos');
let form_Inca = document.getElementById('form_Inca');
let form_Pintelux = document.getElementById('form_Pintelux');
let form_precio = document.getElementById('form_precio');
/*let valorSeleccionado = selectElement.value;*/

selectElement.addEventListener('change', function() {
    const valorSeleccionado = selectElement.value;
    /*si es por categoria o recomendado aun no hago nada, hay 4 productos*/
    if (valorSeleccionado=="menor_p"){
        pinturas_mostrar = pinturas_precio_menor;
    }else if (valorSeleccionado=="mayor_p"){
        pinturas_mostrar = pinturas_precio_mayor;
    }else if (valorSeleccionado=="descuento"){
        pinturas_mostrar = pinturas_precio_menor;
    }else{
        pinturas_mostrar = pinturas_random;
    }

    contenedorPinuras.innerHTML = "";

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
    
        contenedorPinuras.append(lit)
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

    contenedorPinuras.append(lit);
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
                <p>Cant: ${pintura.cantidad}</p>
            `;
            

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
}

const borrar_del_carrito = (pintura) => {
    const index_pintura = productos_a_comprar.findIndex(item => item.id === pintura.id);
    productos_a_comprar.splice(index_pintura, 1);

    actulizar_carrito();
}

const actualizar_total = () => {
    let total = productos_a_comprar.reduce((acc, pint) => acc + (pint.precio * pint.cantidad), 0);
    carrito_total.innerHTML = `$${total}`;
}

actulizar_carrito();