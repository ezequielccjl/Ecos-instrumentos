//CLASE ACTIVO: ANIMACION X

let hamburguer;
let navLinks;
let links;
let sidebar;

document.addEventListener("DOMContentLoaded", function(){
    hamburguer = $(".hamburguer");
    navLinks = document.querySelector(".nav-links");
    links = document.querySelectorAll(".nav-links li");
    sidebar = document.querySelector(".sidebar")

    fadeOpsMenu();

    hamburguer.click(function(){

        sidebar.classList.toggle("active-side-menu")
        hamburguer.toggleClass("activo")

    });

    hamburguer.hover(
        function() {
            sidebar.classList.toggle("hover-hamburguesa")
            
        },
        function() {
            sidebar.classList.toggle("hover-hamburguesa")
            
        }
    )

    escuchaLinks(links)
    
});

function escuchaLinks(opLinks) {
    opLinks.forEach(unaOp => {
        unaOp.addEventListener("click", function() {
            hamburguer.toggleClass("activo")
            sidebar.classList.toggle("active-side-menu")
        })
        
    });
}

function fadeOpsMenu() {
    links.forEach(link => {
        link.classList.toggle("fade")
    });
}



 