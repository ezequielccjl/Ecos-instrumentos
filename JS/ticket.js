let btnComprar;
let contTotal;
let contPago;
let contFinal
let contTicket;
let contTicketFinal;
let contCarrito;

let contDatos;
let btnEfectivo;

let comprarBtnFinal;
let ticket;
let ulListaProds;

let btnVolverTicket;

document.addEventListener("DOMContentLoaded", function(){
    
    btnComprar = document.querySelector("#btnComprar")
    btnEfectivo = document.querySelectorAll(".marco-icono-carrito")
    contTotal = $("#cont-total")
    contPago = $("#cont-pago")
    contTicket = document.querySelector("#cont-ticket")
    contTicketFinal = $("#cont-ticket-final")
    contCarrito = document.querySelector("#contCarrito")
    contDatos = $("#cont-datos")

    //
    contPago.fadeOut()
    contDatos.fadeOut()
    contTicketFinal.fadeOut()

    btnComprar.addEventListener("click", ()=>{
        if (listaCarrito.length>=1) {
            sessionStorage.ProcesoDePago = "true";
            contTotal.fadeOut()
            setTimeout(function () {
                contPago.fadeIn()

                pasarDatosParaPago()
                
            },500)
        }else{
            alertCustom("No hay productos en su carrito.")
        }

    })
})

function pasarDatosParaPago() {
    
    

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
                ticket = {
                    nombre: $(".input-pago")[0].value,
                    telefono: $(".input-pago")[1].value,
                    direccion: $(".input-pago")[2].value,
                    descripcion: $(".input-pago")[3].value,
                    compra: listaCarrito
                }

                contDatos.fadeOut()

                setTimeout(function () {

                    $("#carrito").slideUp()
                    contCarrito.classList.toggle("height-auto")
                    contTicketFinal.fadeIn();
                    
                    document.querySelector("#nombre").innerHTML = `<span class="bolder">Nombre:</span> ${ticket.nombre}`
                    document.querySelector("#telefono").innerHTML = `<span class="bolder">Teléfono:</span> ${ticket.telefono}`
                    document.querySelector("#direccion").innerHTML = `<span class="bolder">Dirección:</span> ${ticket.direccion}`
                    document.querySelector("#descripcion").innerHTML = `<span class="bolder">Descripción:</span> ${ticket.descripcion}`
                    document.querySelector("#total-pago-ticket").innerHTML = `Total: $${calcularTotal()}`
                    
                    ulListaProds = document.querySelector("#lista-prod-ticket");
                    
                    ulListaProds.innerHTML = renderProds();

                    btnVolverTicket = document.querySelector("#volver-ticket")

                    eventoVolver();
                    
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
            <span><span class="bolder">Nombre:</span> ${ticket.nombre}</span>
            <span><span class="bolder">Teléfono:</span> ${ticket.telefono}</span>
            <span><span class="bolder">Dirección:</span> ${ticket.direccion}</span>
            <span><span class="bolder">Descripción:</span> ${ticket.descripcion}</span>
            <div class="bolder">Lista:</div>
            <ul id="lista-prod-ticket"></ul>
            <span id="total-pago-ticket">Total: $${calcularTotal()}</span>

            <button id="volver-ticket" class="btn btnLargo btnAgregar raleway">
                Volver
            </button>
            
        </div>
    </div>
    `
}

function renderInicio() {
    return `
            
    <div id="cont-ticket">
        <div id="cont-total" class="raleway">
            <div id="cont-prod" class="display-none">Productos: 
                <span class="ml-2" id="prodAgregados">
                </span>
            </div>
                
            <div id="total" class="mt-3">Total</div>
                
            <div id="totalNum" class="heebo">$0</div>
                
            <div class="mt-5">
                <button id="btnComprar" class="btn">Comprar</button>
            </div>
                                    
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

function eventoVolver(){
    btnVolverTicket.addEventListener("click", ()=>{
        sessionStorage.ProcesoDePago = "false";
        
        contTicketFinal.fadeOut()
        setTimeout(function () {
            $("#carrito").slideDown()
            contTotal.fadeIn()
            //contCarrito.innerHTML = renderInicio()
            contCarrito.classList.toggle("height-auto")
            //modificarTotal()
            
        },500)

    })
}