
let envio = prompt("Seleccione en que barrio se encuentra para el envío: \n1. Buceo \n2. Parque Batlle \n3. Pocitos \n4. Malvin \n5. Otro");

function presupuesto_envio(valor_envio){
    if (valor_envio=="1") {
        return "Sin costo de envio";
    } else if (valor_envio=="2") {
        return "Costo de envio de: $50";
    } else if (valor_envio=="3") {
        return "Costo de envio de: $150";
    } else if (valor_envio=="4") {
        return "Costo de envio de: $120";
    } else  {
        return "Costo de envio de: $200";
    }
    
}

let resultado_envio = presupuesto_envio(envio);
console.log(resultado_envio);
alert(resultado_envio);