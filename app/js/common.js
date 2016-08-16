$(document).ready(function() {

    //SVG Fallback
    if (!Modernizr.svg) {
        $("img[src*='svg']").attr("src", function() {
            return $(this).attr("src").replace(".svg", ".png");
        });
    };

    //E-mail Ajax Send

    $(".contacts__main-form").submit(function() {
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "/mail.php",
            data: th.serialize()
        }).done(function() {

            $("body").append("<div class='popup popup-success'>Спасибо!<br>Ваше сообщение успешно отправлено!</div>").prepend("<div class='popup-overlay'>");
            $(".popup").slideDown().css({ "top": "50%" });
            setTimeout(function() {
                th.trigger("reset");
                $(".popup").slideDown().css({ "top": "-100%" });
            }, 2000);
            setTimeout(function() {
                $(".popup-overlay").fadeOut();
                $(".popup").delay(1000).remove();
            }, 2500);
        }).error(function() {

            $("body").append("<div class='popup popup-error'>Сообщение не отправлено!</div>").prepend("<div class='popup-overlay'>");
            $(".popup").slideDown().css({ "top": "50%" });
            setTimeout(function() {
                $(".popup").slideDown().css({ "top": "-100%" });
            }, 2000);
            setTimeout(function() {
                $(".popup-overlay").fadeOut();
                $(".popup").delay(1000).remove();
            }, 2500);
        });
        return false;
    });

    //Chrome Smooth Scroll
    try {
        $.browserSelector();
        if ($("html").hasClass("chrome")) {
            $.smoothScroll();
        }
    } catch (err) {

    };

    $("img, a").on("dragstart", function(event) { event.preventDefault(); });

    if ($(".particles").length > 0) {
        particlesJS.load('particles-js_l', 'js/assets/particlesjs-config-l.json');
        particlesJS.load('particles-js_r', 'js/assets/particlesjs-config-r.json');
    }

    ///sticky_menu
    $(".top-menu").addClass("top-menu_original").clone().insertAfter(".top-menu").addClass("top-menu_cloned").css({
        "position": "fixed",
        "top": "-70px",
        "z-index": 9999

    }).removeClass("top-menu_original");

    setInterval(stickMenu, 10);

    function stickMenu() {
        var orgElementPos = $('.top-menu_original').offset(),
            orgElementTop = orgElementPos.top,
            offset = 70;

        if ($(window).scrollTop() >= (orgElementTop + offset)) {
            var orgElement = $('.top-menu_original'),
                coordsOrgElement = orgElement.offset();
            $('.top-menu_cloned').css('top', 0);
            $('.top-menu_original').css('visibility', 'hidden');
            $('.m-button').css({ "position": "fixed", "right": "100" });
            $('.m-button span').css({ "background-color": '#ffffff' });


        } else {
            $('.top-menu_cloned').css('top', '-70px');
            $('.top-menu_original').css('visibility', 'visible');
            $('.m-button').css({ "position": "absolute" });
            $(this).css({ "background-color": "#000000" });
            if ($(this).hasClass("open")) {
                $('.m-button span').css({ "background-color": '#000000' });
            }


        }
    }

    ///end_sticky_menu

});

//mobile_menu
$('.top-menu__nav-list').clone().insertAfter('.top-menu__mobile-btn').addClass('top-menu__mobile_cloned');
$(document).on('click', '.m-button', function() {

    $('.m-button span').css({ "background-color": '#ffffff' });
    if ($(this).hasClass("open")) {
        $('.m-button').css({ "position": "absolute" });
        $(".top-menu__mobile_cloned").fadeOut();
        $('.m-button span').css({ "background-color": '#000000' });
        $("body").removeClass("fixed");
    } else {
        $("body").addClass("fixed");

        $(".top-menu__mobile_cloned").fadeIn();
        $('.m-button').css({ "position": "fixed" });
        $('.m-button span').css({ "background-color": '#ffffff' });
    }

    $(this).toggleClass('open');

});

///gooogle_map
if ($("#google-map").length > 0) {

    function initialize() {
        var styleArray = [{
                featureType: "all",
                stylers: [
                    { saturation: -95 }
                ]
            }, {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [
                    { hue: "#00ffce" },
                    { saturation: 50 }
                ]
            }, {
                featureType: "poi.business",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            }],
            latData = Number($("#google-map").data("lat")),
            lngData = Number($("#google-map").data("lng")),
            myLatLng = { lat: latData, lng: lngData },
            isDraggable = $(document).width() > 768 ? true : false,
            mapProp = {
                center: new google.maps.LatLng(53.902930, 27.598150),
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: styleArray,

                draggable: isDraggable,
                scrollwheel: false,
            },

            map = new google.maps.Map(document.getElementById("google-map"), mapProp),
            image = '../img/map-marker.png',
            marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: 'ItCreativeLab',
                animation: google.maps.Animation.DROP,
                icon: image,
                id: 'map-marker'
            });
    }
    $('#google-map').find('iframe').css("pointer-events", "none");

    function loadScript() {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyAlNg3eJiCSlF-d61TEQir7jqaPkOFNLd4&callback=initialize";

        document.body.appendChild(script);

    }

    loadScript();

}



$('#about-particle').particleground({
    dotColor: 'rgba(0,0,0,0)',
    lineColor: 'rgba(0,0,0,0.22)',
    denisty: 0,
    parallaxMultiplier: 6
});

$('#services-particle').particleground({
    dotColor: 'rgba(0,0,0,0)',
    lineColor: 'rgba(255,255,255,0.22)',
    denisty: 0,
    parallaxMultiplier: 6
});

$('.partner-block__owl').owlCarousel({


    loop: true,
    margin: 40,
    center: true,
    autoplay: true,
    autoWidth: true,
    items: 5,
    nav: true,
    navText: ["", ""],
    autoplaySpeed: 500,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 2
        },
        500: {
            items: 3
        },
        900: {
            items: 4
        },
        1170: {
            items: 5
        }
    }
});

///first larfe letter----about
function first_letter(class_name, span_class) {

    $(class_name).each(function() {
        var txt_full = $(this).text(),
            t_char = $.trim(txt_full).substring(0, 1),
            t_substr = $.trim(txt_full).substring(1);
        char_wrapp = '<span class="' + span_class + '">' + t_char + '</span>';
        txt_full = char_wrapp + t_substr;
        $(this).html(txt_full);
    });
}

first_letter(".about-text__item", "medium-char");

first_letter(".about-text__important", "large-char");
