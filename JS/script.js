var listaCarrito = [];
let listaCatalogo = [];

let parrafo;
let totalPagar;
let prodAgregados;
let contProd;

document.addEventListener("DOMContentLoaded", function(){
    parrafo = document.getElementById("agrego")
    totalPagar = document.getElementById("totalNum")
    prodAgregados = document.getElementById("prodAgregados")
    contProd = document.getElementById("cont-prod")


    cargarListaCatalogo()

})

/*==============================================================================================*/

function agregaralcarrito(idProd){
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

    let contador = listaCarrito.length;

    prodAgregados.innerHTML = `${contador}`

    if (contador>=1) {
        contProd.classList.remove("display-none");

    }else if(contador==0){
        contProd.classList.add("display-none")
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