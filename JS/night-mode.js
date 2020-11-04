//El funcionamiento del nightmode consta de una dependencia de clases CSS con respecto a una que le asigno al body
//Acá me encargo de hacer la animación y togglear las clases segun el localStorage y el usuario lo indiquen

let btnNightMode;
let contBrightmode;
let imgLuna;
let imgSol;

//MODO:
//0=Light- to Night / 1=Night to Light

//Según el localStorage asigno a "modo" el último modo
let modo;
modo = localStorage.modo ? modo = localStorage.modo : localStorage.setItem('modo', '0');

document.addEventListener("DOMContentLoaded", ()=>{

    btnNightMode = document.querySelector("#night-mode")
    contBrightmode = document.querySelector(".cont-brightmode")

    //Imagenes Moon-Sun dentro del HTML
    imgSol = document.querySelector("#img-sol")
    imgLuna = document.querySelector("#img-luna")

    setearSegunLocalStorage();
    eventoClickMenu();
    
})

function setearSegunLocalStorage() {
    //Setea Imagen y Nombre de la opción en el Menu
    if ((localStorage.modo == '0')) {
        $("#night-mode")[0].children[1].textContent = "Night Mode"
        $("#img-nav-mode")[0].attributes[1].value = "icons/moon-36px.png"
    }else{
        $("#night-mode")[0].children[1].textContent = "Light Mode"
        $("#img-nav-mode")[0].attributes[1].value = "icons/sol-light-36px.png"
    }

    //Setea clases del DOM
    if (localStorage.modo=='1') {
        $("#body").addClass("body-night")
        contBrightmode.classList.remove("luna")
        contBrightmode.classList.add("sol")
        imgSol.classList.remove("display-none")
        imgLuna.classList.add("display-none")
    }else{
        $("#body").removeClass("body-night")
        contBrightmode.classList.add("luna")
        contBrightmode.classList.remove("sol")
        imgSol.classList.add("display-none")
        imgLuna.classList.remove("display-none")
    }
}

function eventoClickMenu(){
    btnNightMode.addEventListener("click", function () {
        
        contBrightmode.classList.toggle("display-none")

        setTimeout(()=>{
            window.scrollTo(0, 0)
            contBrightmode.classList.toggle("opacityUno")

            //Se modifica el localStorage.modo
            if (localStorage.modo == '1' ) {localStorage.modo = '0'} else {localStorage.modo = '1'}

            setTimeout(()=>{
                //Toggle de la clase body-night
                if (localStorage.modo=='1') {
                    $("#body").addClass("body-night")
                }else{
                    $("#body").removeClass("body-night")
                }

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
                
                //Toggle de clases para el Contenedor ventana 100%
                if (localStorage.modo == '0') {
                    contBrightmode.classList.toggle("luna")
                    contBrightmode.classList.toggle("sol")
                    imgSol.classList.toggle("display-none")
                    imgLuna.classList.toggle("display-none")
                }else{
                    contBrightmode.classList.toggle("luna")
                    contBrightmode.classList.toggle("sol")
                    imgSol.classList.toggle("display-none")
                    imgLuna.classList.toggle("display-none")
                }
                },500)    

            },1000)

        },500)
        
    })
}