let btnNightMode;
let contBrightmode;
let imgLuna;
let imgSol;

//Mantiene el light-night mode / 0=Light- to noche / 1=Night to dia
let modo;
modo = localStorage.modo ? modo = localStorage.modo : localStorage.setItem('modo', '0');
console.log(modo)

document.addEventListener("DOMContentLoaded", ()=>{

    btnNightMode = document.querySelector("#night-mode")
    contBrightmode = document.querySelector(".cont-brightmode")

    imgSol = document.querySelector("#img-sol")
    imgLuna = document.querySelector("#img-luna")

    //SETEA OPCION DEL SIDE MENU SEGUN EL MODO EN EL QUE EL LOCAL STORAGE SE ENCUENTRE
    if ((localStorage.modo == '0')) {
        $("#night-mode")[0].children[1].textContent = "Night Mode"
        $("#img-nav-mode")[0].attributes[1].value = "icons/moon-36px.png"
    }else{
        $("#night-mode")[0].children[1].textContent = "Light Mode"
        $("#img-nav-mode")[0].attributes[1].value = "icons/sol-light-36px.png"
    }

    //SETEA TODO SEGUN EL MODO EN EL QUE EL LOCAL STORAGE SE ENCUENTRE
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

    btnNightMode.addEventListener("click", function () {
        

        contBrightmode.classList.toggle("display-none")
        setTimeout(()=>{
            window.scrollTo(0, 0)
            contBrightmode.classList.toggle("opacityUno")

            if (localStorage.modo == '1' ) {localStorage.modo = '0'} else {localStorage.modo = '1'}

            setTimeout(()=>{
                //ACA SE HACE TOGGLE DE CLASES PARA MODO OSCURO -------------------
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
                
                //TOGGLE DE CLASES
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
})