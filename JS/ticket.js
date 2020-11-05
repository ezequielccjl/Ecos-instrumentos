let contTicket;
let contTotal, contPago, contDatos, contTicketFinal;//4 Stages
let contCarrito;

let btnComprar;
let btnEfectivoPaypal;
let comprarBtnFinal;
let btnVolverTicket;
let ticket;//Objeto ticket
let ulListaProds;//Lista de productos para el ticket

document.addEventListener("DOMContentLoaded", function(){
    
    btnEfectivoPaypal = document.querySelectorAll(".marco-icono-carrito")
    btnComprar = document.querySelector("#btnComprar")
    contCarrito = document.querySelector("#contCarrito")
    contTicket = document.querySelector("#cont-ticket")
    contTotal = $("#cont-total")
    contPago = $("#cont-pago")
    contDatos = $("#cont-datos")
    contTicketFinal = $("#cont-ticket-final")

    //En el HTML yo cargué los 4 pasos para el Proceso de pago dentro de un "cont-ticket" para poder tratar con ellos mediante javascript
    //Lo que hago acá es desaparecer todos menos el actual (El que muestra el total y los productos agregados)
    contPago.fadeOut()
    contDatos.fadeOut()
    contTicketFinal.fadeOut()

    btnComprar.addEventListener("click", ()=>{
        //Verifica si hay productos agregados para hacer transición al siguiente stage
        if (listaCarrito.length>=1) {
            sessionStorage.ProcesoDePago = "true";
            contTotal.fadeOut()
            setTimeout(function () {
                contPago.fadeIn()

                pasar_a_pago()
                
            },500)
        }else{
            alertCustom("No hay productos en su carrito.")
        }

    })
})

function pasar_a_pago() {

    //No hice diferencia entre el formulario de efectivo y paypal asi que da lo mismo el que presione
    btnEfectivoPaypal.forEach(btn => {
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
            //Como el último campo es opcional hago que pase por los primeros 3
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
                //Crea el objeto una vez que los campos son completados y el telefono valido
                ticket = {
                    nombre: $(".input-pago")[0].value,
                    telefono: $(".input-pago")[1].value,
                    direccion: $(".input-pago")[2].value,
                    descripcion: $(".input-pago")[3].value,
                    compra: listaCarrito
                }

                contDatos.fadeOut()

                mostrarElTicket();
            }
        }

        

    })
}

function mostrarElTicket(){
    setTimeout(function () {

        $("#carrito").slideUp()
        contCarrito.classList.add("height-auto")
        contTicketFinal.fadeIn();
        
        document.querySelector("#nombre").innerHTML = `<span class="bolder">Nombre:</span> ${ticket.nombre}`
        document.querySelector("#telefono").innerHTML = `<span class="bolder">Teléfono:</span> ${ticket.telefono}`
        document.querySelector("#direccion").innerHTML = `<span class="bolder">Dirección:</span> ${ticket.direccion}`
        document.querySelector("#descripcion").innerHTML = `<span class="bolder">Descripción:</span> ${ticket.descripcion}`
        document.querySelector("#total-pago-ticket").innerHTML = `<span class="precio">Total: $${calcularTotal()}</span>`
        
        ulListaProds = document.querySelector("#lista-prod-ticket");
        
        ulListaProds.innerHTML = renderProds();

        btnVolverTicket = document.querySelector("#volver-ticket")

        eventoVolver();
        
    },500)
}

//Lista de productos en el ticket
function renderProds()  {
    let htmlProd = " ";
    listaCarritoFinal().forEach(prod => {
        
        htmlProd = htmlProd + `<li>-${prod.producto.nombre} x${prod.cantidad}</li>`
    });

    return htmlProd;
}

//Escucha al boton Volver para finalizar el Proceso de pago
function eventoVolver(){
    btnVolverTicket.addEventListener("click", ()=>{
        sessionStorage.ProcesoDePago = "false";
        
        contTicketFinal.fadeOut()
        setTimeout(function () {
            $("#carrito").slideDown()
            contTotal.fadeIn()
            contCarrito.classList.remove("height-auto")
            
        },500)

    })
}

function alertCustom(message){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
      })
}