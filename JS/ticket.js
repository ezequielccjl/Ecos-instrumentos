let btnComprar;
let contTotal;
let contPago;

document.addEventListener("DOMContentLoaded", function(){

    btnComprar = document.querySelector("#btnComprar")
    contTotal = $("#cont-total")
    contPago = $("#cont-pago")
    contPago.fadeOut()

    btnComprar.addEventListener("click", ()=>{
        console.log(btnComprar)
        
        contTotal.fadeOut()
        setTimeout(function () {
            contPago.fadeIn()
        },500)

    })
})