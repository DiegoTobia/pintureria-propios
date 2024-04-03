
let compra;
let total_compra=0;
let accesorios_comprados = [];
dicc_accesorios_comprado = {
    Rodillo: {costo:449, cantidad:0},
    Guantes: {costo:99, cantidad:0},
    Pincel: {costo:299, cantidad:0},
    Lija: {costo:39, cantidad:0},
};
let acc_comprado;
let accesorio;
let des_total_compra;
do{
    compra = prompt("Seleccione el accesosrio que quiere comprar: \n1. Rodillo \n2. Guantes \n3. Pincel \n4. Lija \n5. No quiero comprar mas") 
    if (compra=="1"){
        total_compra = total_compra + 449;
        accesorio = "Rodillo";
    }else if (compra=="2"){
        total_compra = total_compra + 99;
        accesorio = "Guantes";
    }else if (compra=="3"){
        total_compra = total_compra + 299;
        accesorio = "Pincel";
    }else if (compra=="4"){
        total_compra = total_compra + 39;
        accesorio = "Lija";
    }else{
        accesorio = "";
    }
    if (accesorio!=""){
        dicc_accesorios_comprado[accesorio]["cantidad"] = dicc_accesorios_comprado[accesorio]["cantidad"] + 1;
        accesorios_comprados.push(accesorio);
    }
    des_total_compra = "Total de compra: " + total_compra.toString();
    console.log(dicc_accesorios_comprado);
    console.log(accesorios_comprados);
    console.log(des_total_compra);
    alert(des_total_compra);
} while (compra!="5");
