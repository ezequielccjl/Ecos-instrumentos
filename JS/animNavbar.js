//Animacion de ECOS Music en navbar

$(document).ready(function(){

    let nav = $(".fixed").height();
    let header = $(".fondo").height();
    let total = nav+header-10;

    let disp = $(".disparador");
    disp.fadeOut()

    //La animación se dispara cuando el scrollY supere el Header de presentación
    $(window).scroll(function(){
        if (window.pageYOffset>total) {
            disp.fadeIn(300)
        }
        if (window.pageYOffset<total) {
            disp.slideUp(100)
        }
    })

    //Cada vez que la ventana cambie de tamaño los valores se moifican
    window.addEventListener('resize', function(){
        nav = $(".fixed").height();
        header = $(".fondo").height();
        total = nav+header;
    });
})