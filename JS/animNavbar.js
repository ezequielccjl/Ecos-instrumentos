$(document).ready(function(){
    let verificacion = false;

    let nav = $(".fixed").height();
    let header = $(".fondo").height();
    let total = nav+header-10;
    
    let objNav = $(".fixed")

    let disp = $(".disparador");
    disp.fadeOut()

    //====================================== ANIMACIONES JQUERY (FadeIn // SlideUp)
    $(window).scroll(function(){
        if (window.pageYOffset>total) {
            if (verificacion == false) {
                disp.fadeIn(300)
            }
        }
        if (window.pageYOffset<total) {
            if (verificacion == false) {
                disp.slideUp(100)
            }
        }
    })

    window.addEventListener('resize', function(){
        nav = $(".fixed").height();
        header = $(".fondo").height();
        total = nav+header;
    });
})