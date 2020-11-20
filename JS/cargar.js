let contCatalogo;
let contSlider;
let contLista;
let snipper;
let htmlCollectionBotones = []; //Lista de botones "Agregar al carrito"
let botones = [];

let cantidadEnLista = 0;
let listaDivsAgregados = [];
let listaBotonesMas = [];
let listaBotonesMenos = [];


let lSSlideOuter;

//noPager -> clase para sacar

window.onload = function (){

    contCatalogo = document.getElementById("contCatalogo")
    contSlider = document.getElementById("content-slider")
    htmlCollectionBotones = document.getElementsByClassName("btnAgregar")
    
    contLista = document.getElementById("listaProd")
    snipper = document.getElementById("snipper-carga")
    

    lSSlideOuter = $(".lSSlideOuter")
    lSSlideOuter.removeClass("noPager")
    //Verificación para mostrar productos en carrito según LocalStorage
    if (listaCarrito.length>=1) {
        mostrarProdsAgregados()
        cargarListaCarrito()
        actualizaLista()
    }

    //Desactiva snipper y muestra catalogo
    setTimeout(function (){
        snipper.classList.toggle("display-none")
        contSlider.classList.toggle("display-none")
        cargarCatalogo();
        cargarListaCarrito();
    },2000)
    
}

/*==============================================================================================*/

function cargarCatalogo(){
    contSlider.innerHTML = " ";
    let html = " ";

    $.ajax({
        url: "catalogo.json",
        success: function(data){
            data.forEach(prod => {
                html = html + htmlCatalogo(prod);
            });
            contSlider.innerHTML = html;
            
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
            <div class="card text-center sombras cartaAncho ">
                <img class="card img-top centrar" src="${prod.imagen}" alt="${prod.alt}" width="50%" height="150px">

                <div class="card-body heebo">
                    <p class="mb-1">${prod.nombre}</p>
                    <p class="m-0">
                        <span class="font-weight-bold precio">$${prod.precio}</span>
                    </p>
                    <div class="row m-0 p-0 btnMasMenos mt-2 justify-content-center">
                        <button id="comprarBtn" class="btn btnLargo btnAgregar raleway" onclick="agregaralcarrito(${prod.id}) ">
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


//Evento click en botones "Agregar al carrito" => Actualiza la lista de productos
function cargarListaCarrito(){

    setTimeout(function(){
        botones = Array.prototype.slice.call(htmlCollectionBotones)
    
        botones.forEach(boton => {
            boton.addEventListener("click", function(){
                
                actualizaLista()

            })
        });
        
    }, 800)//Tiempo para que carguen todas las cards y sus botones

}

function actualizaLista() {
    contLista.innerHTML = htmlLista()

    //Actualiza array de li's en ListaProductos
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
            listaBtn = document.querySelectorAll(".listaBtn")
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
            <a class="listaBtn listaMas"><i class="fas fa-plus"></i></a>
            <a class="listaBtn listaMenos"><i class="fas fa-minus"></i></a>
            </span>

        </div>
    `
}

//Devuelve objetos de los productos en carrito y su respectiva cantidad
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

        //Crea objeto para lista
        let prodCant = {producto : prodActual, cantidad : cont};

        productosYCantidad.push(prodCant);
    });

    return productosYCantidad;
}


//================= Eventos para funciones +/- en Lista ====================


function sumaRestaEventos(){
    //Cada vez que se modifica la ListaProductos hay que setear nuevos arrays con los respectivos botones +/-
    //y poner en escucha sus eventos
    listaBotonesMas = []
    listaBotonesMenos = []
    
    //Se llenas arrays con los botones
    llenarBtnMas();
    llenarBtnMenos();

    //Eventos click para cada elemento de los arrays
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
                let nombreProd = boton.offsetParent.parentElement.children[0].textContent;
                listaCatalogo.forEach(prod => {
                    if (prod.nombre == nombreProd) {
                        prodParaRestar = prod;
                    }
                });
    
                //Borra UN producto de la lista carrito
                let indiceProdBorrar = listaCarrito.indexOf(prodParaRestar)
                listaCarrito.splice(indiceProdBorrar,1)

                //Actualiza el DOM y el localStorage
                mostrarProdsAgregados();
                actualizaLista()
                localStorage.listaCarrito = JSON.stringify(listaCarrito);

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
                let nombreProd = boton.parentNode.parentElement.children[0].textContent;
                
                listaCatalogo.forEach(prod => {
                    if (prod.nombre == nombreProd) {
                        prodParaAgregar = prod;
                        return;
                    }
                });

                //Agrega prod a lista
                listaCarrito.push(prodParaAgregar);

                //Actualiza el DOM y el localStorage
                mostrarProdsAgregados();
                actualizaLista()
                mostrarNotif();
                localStorage.listaCarrito = JSON.stringify(listaCarrito);

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




