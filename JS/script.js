var listaCarrito = [];
let listaCatalogo = [];

let parrafo;
let totalPagar;
let prodAgregados;
let contProd;

sessionStorage.setItem('ProcesoDePago', 'false');

document.addEventListener("DOMContentLoaded", function(){
    parrafo = document.getElementById("agrego")
    totalPagar = document.getElementById("totalNum")
    prodAgregados = document.getElementById("prodAgregados")
    contProd = document.getElementById("cont-prod")


    cargarListaCatalogo()

})

/*==============================================================================================*/

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
        //==================== STORAGE
        let cantidad = cantEnCarrito(idProd)

        localStorage.setItem(idProd, cantidad);   
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

function modificarTotal(){
    totalPagar.textContent = " ";
    totalPagar.textContent = "$"+calcularTotal()
}

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

    modificarTotal();
}

function cantEnCarrito(id){
    let contador = 0;
    listaCarrito.forEach(prod => {
        if (prod.id == id) {
            contador = contador +1;
        }
    });
    return contador;
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