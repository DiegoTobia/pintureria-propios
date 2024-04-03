const productos_a_comprar = JSON.parse(localStorage.getItem("productos_a_comprar")) || [];

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