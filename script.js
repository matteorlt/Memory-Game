$(document).ready(function () {
    // Animation du bouton "En savoir plus"
    $("#learn-more").click(function () {
        $("html, body").animate({
            scrollTop: $("#about").offset().top
        }, 1000);
    });

    // Animation de la section "À propos"
    $("#about").hide().fadeIn(2000);

    // Changement de couleur de fond lors du survol des liens de navigation
    $("nav ul li a").hover(function () {
        $(this).css("background-color", "#ff6f61");
    }, function () {
        $(this).css("background-color", "transparent");
    });
});
