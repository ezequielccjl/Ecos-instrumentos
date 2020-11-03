let catalogoCarrito;//class catalogo-carrito-night 
//let btnComprar;//id border-night 
let marcoIconoCarrito;//class border-night 
let contenidoModal;//class card-night 
let btnAgregar;//class border-night 
let card;//class card-night 

let btnNightMode;
let contBrightmode;
let imgLuna;
let imgSol;

//Mantiene el light-night mode / 0=Light- to noche / 1=Night to dia
localStorage.setItem('modo', '0');

document.addEventListener("DOMContentLoaded", ()=>{


    marcoIconoCarrito = document.querySelectorAll(".marco-icono-carrito")
    btnNightMode = document.querySelector("#night-mode")
    console.log($("#img-nav-mode")[0].attributes[1].value)
    contBrightmode = document.querySelector(".cont-brightmode")

    imgSol = document.querySelector("#img-sol")
    imgLuna = document.querySelector("#img-luna")

    catalogoCarrito = $(".catalogo-carrito") //lista
    //card = $(".card") //lista  CARGAR.JS 105

    btnNightMode.addEventListener("click", function () {
        if (localStorage.modo == '0') {
            contBrightmode.classList.add("luna")
            contBrightmode.classList.remove("sol")
        }else{
            contBrightmode.classList.remove("luna")
            contBrightmode.classList.add("sol")
        }

        contBrightmode.classList.toggle("display-none")
        setTimeout(()=>{
            window.scrollTo(0, 0)
            contBrightmode.classList.toggle("opacityUno")

            if (localStorage.modo == '1' ) {localStorage.modo = '0'} else {localStorage.modo = '1'}

            setTimeout(()=>{
                //ACA SE HACE TOGGLE DE CLASES PARA MODO OSCURO -------------------
                $("#body").toggleClass("body-font-night")
                $("#seccion-contacto").toggleClass("seccion-tiendas-night")
                $(".titulo-tiendas").toggleClass("seccion-tiendas-night")
                $("#contLista").toggleClass("border-night")
                $("#contCarrito").toggleClass("border-night")
                contenidoModal.classList.toggle("card-night")
                btnComprar.classList.toggle("border-night")

                for (let i = 0; i < card.length; i++) {  
                    card[i].classList.toggle("card-night")
                    
                }

                for (let i = 0; i < catalogoCarrito.length; i++) {
                    catalogoCarrito[i].classList.toggle("catalogo-carrito-night")
                    
                }

                for (let i = 0; i < btnAgregar.length; i++) {
                    btnAgregar[i].classList.toggle("border-night")
                    
                }

                for (let i = 0; i < marcoIconoCarrito.length; i++) {
                    marcoIconoCarrito[i].classList.toggle("border-night")
                    
                }

                //ACA TERMINA EL TOGGLE DE MODO OSCURO ---------------------------

                contBrightmode.classList.toggle("opacityUno")
                
                if ((localStorage.modo == '0')) {
                    $("#night-mode")[0].children[1].textContent = "Night Mode"
                    $("#img-nav-mode")[0].attributes[1].value = "icons/moon-36px.png"
                }else{
                    $("#night-mode")[0].children[1].textContent = "Light Mode"
                    $("#img-nav-mode")[0].attributes[1].value = "icons/sol-light-36px.png"
                }

                setTimeout(()=>{
                contBrightmode.classList.toggle("display-none")
                imgSol.classList.toggle("display-none")
                imgLuna.classList.toggle("display-none")
                },500)    

            },1000)

        },500)
        
    })
})