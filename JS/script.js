let listaCarrito = localStorage.listaCarrito ? JSON.parse(localStorage.listaCarrito) : [];
let listaCatalogo = [];

let parrafo;
let totalPagar;
let prodAgregados;
let contProd;

//Proceso de Pago se utiliza para restricciones de agregar/restar al carrito mientras se Realiza compra
sessionStorage.setItem('ProcesoDePago', 'false');

document.addEventListener("DOMContentLoaded", function(){

    parrafo = document.getElementById("agrego")
    totalPagar = document.getElementById("totalNum")
    prodAgregados = document.getElementById("prodAgregados")
    contProd = document.getElementById("cont-prod")

    cargarListaCatalogo()

})

/*==============================================================================================*/

//Se ejecuta con onclick() en los botones de las cards
function agregaralcarrito(idProd){
    if (sessionStorage.ProcesoDePago == "false") {
        mostrarNotif();
        listaCatalogo.forEach(prod => {
            if (prod.id == idProd) {
                listaCarrito.push(prod);
            }
        });
        mostrarProdsAgregados();

        actualizaLista()

        localStorage.listaCarrito = JSON.stringify(listaCarrito);

    }else{
        alertCustom("No se pueden agregar productos mientras realiza una compra")
    }
}

function calcularTotal(){
    let total = 0;
    listaCarrito.forEach(prod => {
        total = total + prod.precio;
    });
    return total;
}

//Se utiliza para modificar el DOM del Carrito y mostrar los productos agregados en el Navbar
function mostrarProdsAgregados(){
    prodAgregados.innerHTML = " ";
    document.querySelector(".dot").innerHTML = " ";

    let contador = listaCarrito.length;

    prodAgregados.innerHTML = `${contador}`
    document.querySelector(".dot").innerHTML = `${contador}`

    if (contador>=1) {
        contProd.classList.remove("display-none");
        document.querySelector(".dot").classList.remove("display-none")

    }else if(contador==0){
        contProd.classList.add("display-none")
        document.querySelector(".dot").classList.add("display-none")

    }

    totalPagar.textContent = " ";
    totalPagar.textContent = "$"+calcularTotal()
}


function cargarListaCatalogo(){
    $.ajax({
        url: "JSON/catalogo.json",
        success: function(data){
            data.forEach(element =>{
                listaCatalogo.push(element)
            })
        },
        error: function (error) {
            console.log("ERROR")
        }
    });
}

//Toast de producto Agregado
function mostrarNotif() {
    Swal.fire({
        title: 'Producto agregado!',
        position: "top-end",
        showConfirmButton: "false",
        timer: 1500,
        icon: "success",
        toast: "true",
    })
}