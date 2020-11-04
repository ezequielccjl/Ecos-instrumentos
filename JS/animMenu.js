//Animación SideMenu

let hamburguer;
let navLinks;
let links;
let sidebar;

document.addEventListener("DOMContentLoaded", function(){
    hamburguer = $(".hamburguer");
    navLinks = document.querySelector(".nav-links");
    links = document.querySelectorAll(".nav-links li");
    sidebar = $(".sidebar")

    //Se muestra el menú completo
    hamburguer.click(function(){

        sidebar.toggleClass("active-side-menu")
        hamburguer.toggleClass("activo")

    });

    //Se asoma el menú
    hamburguer.hover(
        function() {
            sidebar.toggleClass("hover-hamburguesa")
            
        },
        function() {
            sidebar.toggleClass("hover-hamburguesa")
            
        }
    )

    escuchaLinks(links)
    
});

//Cada vez que se clickee una opción => El menú debe cerrarse
function escuchaLinks(opLinks) {
    opLinks.forEach(unaOp => {
        unaOp.addEventListener("click", function() {
            hamburguer.toggleClass("activo")
            sidebar.toggleClass("active-side-menu")
        })
        
    });
}
 