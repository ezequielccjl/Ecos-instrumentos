//CLASE ACTIVO: ANIMACION X

let hamburguer;
let navLinks;
let links;
let sidebar;

document.addEventListener("DOMContentLoaded", function(){
    hamburguer = $(".hamburguer");
    navLinks = document.querySelector(".nav-links");
    links = document.querySelectorAll(".nav-links li");
    sidebar = $(".sidebar")

    fadeOpsMenu();

    hamburguer.click(function(){

        sidebar.toggleClass("active-side-menu")
        hamburguer.toggleClass("activo")

    });

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

function escuchaLinks(opLinks) {
    opLinks.forEach(unaOp => {
        unaOp.addEventListener("click", function() {
            hamburguer.toggleClass("activo")
            sidebar.toggleClass("active-side-menu")
        })
        
    });
}

function fadeOpsMenu() {
    links.forEach(link => {
        link.classList.toggle("fade")
    });
}



 