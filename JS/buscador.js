let buscador;
let prodBusqueda;
let contenedorSlider;

let productosFiltrados;

let arrayProductosBuscados = [];

document.addEventListener("DOMContentLoaded", function(){
    buscador = $("#buscador-text")
    
    //Cada vez que el usuario presiona una tecla
    buscador.keydown(function() {

        arrayProductosBuscados = [];

        setTimeout(function(){
            contenedorSlider = document.getElementById("content-slider")
            prodBusqueda = buscador[0].value.toLowerCase();
            
            cargarBusqueda(buscarProd())
            verificarInput()
        }, 100)

    });

})

function buscarProd(){
    $.ajax({
        url: "../catalogo.json",
        success: function(data){
            
            productosFiltrados = data.filter(prod => {
                return prod.nombre.toLowerCase().includes(prodBusqueda); 
            })
        },
        error: function (error) {
            console.log("ERROR")
        }
    });

    return productosFiltrados;
}

//Vacia todo lo que esté en el slider y lo llena con la busqueda del usuario
//Tira error en consola pero funciona
function cargarBusqueda(arrayBusqueda){
    contenedorSlider.innerHTML = " ";
    let html = " ";
    
    arrayBusqueda.forEach(prod => {
        html = html + htmlCatalogo(prod);
    });
    contenedorSlider.innerHTML = html
    
}

//Se utiliza para mantener estatica la barra del buscador cuando se encuentre llena
function verificarInput(){

    if (prodBusqueda.length >= 1) {
        buscador.addClass("input-lleno")
    }else{
        buscador.removeClass("input-lleno")
    }
}

