let contCatalogo;
let contSlider;
let contLista;
let snipper;
let htmlCollectionBotones = [];
let botones = [];

//listaDivsAgregados[0].children[2].children[0]

let cantidadEnLista = 0;
let listaDivsAgregados = [];
let listaBotonesMas = [];
let listaBotonesMenos = [];

let prodListados = []

window.onload = function (){

    localStorage.clear();

    contCatalogo = document.getElementById("contCatalogo")
    contSlider = document.getElementById("content-slider")
    htmlCollectionBotones = document.getElementsByClassName("btnAgregar")
    
    contLista = document.getElementById("listaProd")
    snipper = document.getElementById("snipper-carga")
    
    setTimeout(function (){
        snipper.classList.toggle("display-none")
        contSlider.classList.toggle("display-none")
        cargarCatalogo();
        cargarListaCarrito();
        
    },2000)
    
}


//--------CARGA DE CATALOGO
function cargarCatalogo(){
    contSlider.innerHTML = " ";
    let html = " ";

    $.ajax({
        url: "JSON/catalogo.json",
        success: function(data){
            data.forEach(prod => {
                html = html + htmlCatalogo(prod);
            });
            contSlider.innerHTML = html
        },
        error: function (error) {
            console.log("ERROR")
        }
    });

    
}

function htmlCatalogo(prod){
    return `
    <li id="${prod.id}" class="mr">
        <div class="unProducto">
            <div class="card text-center sombras cartaAncho card-night">
                <img class="card img-top centrar" src="${prod.imagen}" alt="${prod.alt}" width="50%" height="150px">

                <div class="card-body heebo">
                    <p class="mb-1">${prod.nombre}</p>
                    <p class="m-0">
                        <span class="font-weight-bold">$${prod.precio}</span>
                    </p>
                    <div class="row m-0 p-0 btnMasMenos mt-2 justify-content-center">
                        <button id="comprarBtn" class="btn btnLargo btnAgregar raleway border-night" onclick="agregaralcarrito(${prod.id}) ">
                            Agregar
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </li>
    `
}


//-------CARGA DE LISTA
function cargarListaCarrito(){
    contLista.innerHTML = " ";
    let lista = listaProductoCantidad();
    let productoEnLista;
    let html = " "
    let prodCantFINAL;

    setTimeout(function(){
        botones = Array.prototype.slice.call(htmlCollectionBotones)
    
        botones.forEach(boton => {
            boton.addEventListener("click", function(){
                
                actualizaLista()

            })
        });
    }, 800)

    

}

function actualizaLista() {
    //ACTUALIZA LISTA
    contLista.innerHTML = htmlLista()

    listaDivsAgregados = $(".unLi");
    cantidadEnLista = listaDivsAgregados.length;
    sumaRestaEventos();
}


function htmlLista(){
    let html = " "

    listaProductoCantidad().forEach(element => {
        if (element.cantidad>=1) {
            let nombre = element.producto.nombre;
            let cantidad = element.cantidad;
            html = html + htmlListaUnidad(nombre, cantidad);
        }
    });

    return html;
}

function htmlListaUnidad(nombre, cantidad){
    return `
        <div class="unLi mb-2">
            <span class="listaNombre">${nombre}</span>
            <span class="listaCant">${cantidad}</span>
                        
            <span class="botonesMasMenos">
            <a class="listaBtn listaMas btn-lista-night"><i class="fas fa-plus"></i></a>
            <a class="listaBtn listaMenos btn-lista-night"><i class="fas fa-minus"></i></a>
            </span>

        </div>
    `
}

function listaProductoCantidad(){
    
    let productosYCantidad = [];
    listaCatalogo.forEach(prodCatalogo => {
        let cont = 0;
        let prodActual = prodCatalogo;

        listaCarrito.forEach(prodCarrito => {
            if (prodActual.id == prodCarrito.id) {
                cont = cont + 1;
            }
        });

        //Crea objeto para nueva lista
        let prodCant = {producto : prodActual, cantidad : cont};

        productosYCantidad.push(prodCant);
    });

    return productosYCantidad;
}


//=====================================

function sumaRestaEventos(){
    listaBotonesMas = []
    listaBotonesMenos = []
    
    llenarBtnMas();
    llenarBtnMenos();

    sumarUnProducto();
    restarUnProducto();
}

function llenarBtnMas(){
    for (let i = 0; i < listaDivsAgregados.length; i++) {
        listaBotonesMas.push(listaDivsAgregados[i].children[2].children[0]); 
    }
}

function llenarBtnMenos(){
    for (let i = 0; i < listaDivsAgregados.length; i++) {
        listaBotonesMenos.push(listaDivsAgregados[i].children[2].children[1]); 
    }
}

function restarUnProducto(){
    listaBotonesMenos.forEach(boton => {
        boton.addEventListener("click", function(){
            if (sessionStorage.ProcesoDePago == "false") {
                let prodParaRestar;
                nombreProd = boton.offsetParent.parentElement.children[0].textContent;
    
                listaCatalogo.forEach(prod => {
                    if (prod.nombre == nombreProd) {
                        prodParaRestar = prod;
                    }
                });
    
                let indiceProdBorrar = listaCarrito.indexOf(prodParaRestar)
                listaCarrito.splice(indiceProdBorrar,1)
    
                mostrarProdsAgregados();
                actualizaLista()
            }else{
                alertCustom("No se pueden restar productos mientras realiza una compra")
            }
        })
    });
}

function sumarUnProducto(){
    listaBotonesMas.forEach(boton => {
        boton.addEventListener("click", function(){
            if (sessionStorage.ProcesoDePago == "false") {
                let prodParaAgregar;
                nombreProd = boton.parentNode.parentElement.children[0].textContent;
                
    
                listaCatalogo.forEach(prod => {
                    if (prod.nombre == nombreProd) {
                        prodParaAgregar = prod;
                        return;
                    }
                });
                listaCarrito.push(prodParaAgregar);
                mostrarProdsAgregados();
                mostrarNotif();
                prodListados = document.querySelectorAll(".unLi")
                
                actualizaLista()
            }else{
                alertCustom("No se pueden agregar productos mientras realiza una compra")
            }
            
        })
    });
}

function listaUL() {
    return `
    <div class="item pt-2">
        <ul id="content-slider" class="content-slider pt-2">
        </ul>
    </div
    `
}

function listaCarritoFinal() {
    let listaCarritoFinal = [];
    listaProductoCantidad().forEach(prod => {
        if (prod.cantidad>=1) {
            let unProd = {
                producto: prod.producto,
                cantidad: prod.cantidad
            }
            listaCarritoFinal.push(unProd)
        }
    });
    return listaCarritoFinal;
}




