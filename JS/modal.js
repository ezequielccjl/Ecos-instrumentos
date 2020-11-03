let arrayImagenesProductos = [];
let id;
let fullProduct;
let ventanaModal;
let overlay;
let btnCerrarModal;

document.addEventListener("DOMContentLoaded", function(){

  setTimeout(function () {
            
            arrayImagenesProductos = document.querySelectorAll(".img-top")
            ventanaModal = document.querySelector("#ventana-modal")
            overlay = document.querySelector("#overlay")

            overlay.addEventListener("click",()=>{
              toggleFondo()
            })
        
            recorrerImagenes();

    }, 3000)
})

//Recorre todo el array de imagenes del catalogo
function recorrerImagenes() {
  
            for (let i = 0; i < arrayImagenesProductos.length; i++) {

                //Inicia evento para click en imagenes
                arrayImagenesProductos[i].addEventListener("click", function () {
                  
                    ventanaModal.innerHTML = " ";

                    //Busca id del producto
                    id = arrayImagenesProductos[i].parentElement.parentElement.parentElement.attributes[0].value;
                    
                    listaCatalogo.forEach(prod =>{
                        if (prod.id == id) {
                            fullProduct = prod;
                            bajarModal()
                        }
                    })

                })

            }
}

//Clases para que el usario toque overlay y salga del modal
function toggleFondo() {
  overlay.classList.toggle("fondo-negro")
  ventanaModal.classList.toggle("bajar-modal");
}

//Toggle clases para ubicar modal en su posicion
function bajarModal() {
  overlay.classList.toggle("fondo-negro")
  ventanaModal.classList.toggle("bajar-modal");
  ventanaModal.innerHTML = htmlModal()
}

//Div del Modal
function htmlModal() {
    return `
    <div class="modal-dialog" role="document">
      <div class="modal-content card-night">
        <div class="modal-header">
          <h5 class="modal-title">${fullProduct.nombre}</h5>
          
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-5 col-img-modal">
                <img class="mt-3" src="${fullProduct.imagen}" alt="producto">
            </div>
            <div class="col-6 ml-4 contenedor-desc-modal">
              <div id="titulo-desc-modal">Descripción</div>
              <p class="text-center mt-2">${fullProduct.desc}</p>
              <div id="precio-modal">$${fullProduct.precio}</div>
            </div>
          </div> 
        </div>
        <div class="modal-footer">
            <button id="comprarBtn" class="btn btnLargo btnAgregar raleway border-night" onclick="agregaralcarrito(${fullProduct.id}) ">
              Agregar
              <i class="fas fa-shopping-cart"></i>
            </button>
        </div>
      </div>
    </div>
  `
}

