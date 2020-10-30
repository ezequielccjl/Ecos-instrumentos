let btnComprar;
let contTotal;
let contPago;
let contFinal
let contTicket;

let btnEfectivo;
let contDatos;

let comprarBtnFinal;
let ticket;
let ulListaProds;

document.addEventListener("DOMContentLoaded", function(){

    contTicket = document.querySelector("#cont-ticket")
    btnComprar = document.querySelector("#btnComprar")
    contTotal = $("#cont-total")
    contPago = $("#cont-pago")
    contDatos = $("#cont-datos")

    
    contPago.fadeOut()
    contDatos.fadeOut()

    btnComprar.addEventListener("click", ()=>{
        
        contTotal.fadeOut()
        setTimeout(function () {
            contPago.fadeIn()

            pasarDatosParaPago()
            
        },500)

    })
})

function pasarDatosParaPago() {
    btnEfectivo = document.querySelectorAll(".marco-icono-carrito")
    

    btnEfectivo.forEach(btn => {
        btn.addEventListener("click", ()=>{

            contPago.fadeOut()

            setTimeout(function () {
                contDatos.fadeIn()

                submitDatos();
            
            },500)
        })
    });
}

function submitDatos() {
    let camposVacios = false;
    comprarBtnFinal = $("#comprar-btn-final")


    comprarBtnFinal.click(()=>{

        //Verificacion de campos vacios
        for (let i = 0; i < 3; i++) {

            if($(".input-pago")[i].value == "" ){
                camposVacios = true;
            }
            
        }

        if (camposVacios == true) {
            alertCustom('Complete los campos requiridos!')
            camposVacios = false;
        }else{

            //Verificacion de telefono correcto
            let telefono = parseInt($(".input-pago")[1].value)

            if (isNaN(telefono)) {
                alertCustom('Ingrese un teléfono adecuado')
            }else{
                //Esto sucede una vez que los campos son completados y el telefono valido
                console.log("tel valido")
                ticket = {
                    nombre: $(".input-pago")[0].value,
                    telefono: $(".input-pago")[1].value,
                    direccion: $(".input-pago")[2].value,
                    descripcion: $(".input-pago")[3].value,
                    compra: listaCarrito
                }

                console.log(ticket)

                contDatos.fadeOut()

                setTimeout(function () {
                    $("#carrito").slideUp()
                    contTicket.innerHTML = renderTicket();
                    ulListaProds = document.querySelector("#lista-prod-ticket");
                    ulListaProds.innerHTML = renderProds();
                    
                },500)
            }
        }

        

    })
}

function alertCustom(message){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
      })
}

function renderTicket() {
    return `
    <div id="cont-ticket-final" class="mt-3">
        <div id="titulo-final-ticket">COMPRA REALIZADA CON EXITO!!</div>
        <div class="mt-2 mb-2"><img src="../icons/en-camino.png" alt=""></div>
        <div class="flex-column-ticket raleway">
            <span>Nombre: ${ticket.nombre}</span>
            <span>Teléfono: ${ticket.telefono}</span>
            <span>Dirección: ${ticket.direccion}</span>
            <span>Descripción: ${ticket.descripcion}</span>
            <div>Lista:</div>
            <ul id="lista-prod-ticket">
                
            </ul>
        </div>
    </div>
    `
}

function renderProds()  {
    let htmlProd = " ";
    listaCarritoFinal().forEach(prod => {
        
        htmlProd = htmlProd + `<li>-${prod.producto.nombre} x${prod.cantidad}</li>`
    });

    return htmlProd;
}