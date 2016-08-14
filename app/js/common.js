$(document).ready(function(){

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

	if($(".particles").length > 0){
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

	function stickMenu(){
		var orgElementPos = $('.top-menu_original').offset(),
		orgElementTop = orgElementPos.top,
		offset = 70;               

		if ($(window).scrollTop() >= (orgElementTop + offset)) {     
			var orgElement = $('.top-menu_original'),
			coordsOrgElement = orgElement.offset();
			$('.top-menu_cloned').css('top',0);
			$('.top-menu_original').css('visibility','hidden');
			$('.m-button').css({"position": "fixed", "right": "100"});
			$('.m-button span').css({"background-color": '#ffffff'});
			
			
		} else {
			$('.top-menu_cloned').css('top', '-70px');
			$('.top-menu_original').css('visibility','visible');
			$('.m-button').css({"position": "absolute"});
			$(this).css({"background-color" : "#000000"});
			if($(this).hasClass("open")){
				$('.m-button span').css({"background-color": '#000000'});
			}
			
			
		}
	}

	///end_sticky_menu

	





});

//mobile_menu
$('.top-menu__nav-list').clone().insertAfter('.top-menu__mobile-btn').addClass('top-menu__mobile_cloned');
$(document).on('click', '.m-button', function(){

	$('.m-button span').css({"background-color": '#ffffff'});
	if($(this).hasClass("open")){
			$('.m-button').css({"position": "absolute"});
			$(".top-menu__mobile_cloned").fadeOut();
			$('.m-button span').css({"background-color": '#000000'});
		}else{

			
			$(".top-menu__mobile_cloned").fadeIn();
			$('.m-button').css({"position": "fixed"});
			$('.m-button span').css({"background-color": '#ffffff'});
		}

	$(this).toggleClass('open');
	
});


	

function mobileMenu(){

	if(window.innerWidth < 992){
		// $('.top-menu__nav').hide();
		// $('#m-button').show();
	}else{
		// $('.top-menu__nav').show();
		// $('#m-button').hide();
	}

}
setInterval(mobileMenu, 10);


///gooogle_map
if($("#google-map").length > 0){
	function initialize() {
		 var styleArray = [
          {
            featureType: "all",
            stylers: [
             { saturation: -95 }
            ]
          },{
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [
              { hue: "#00ffce" },
              { saturation: 50 }
            ]
          },{
            featureType: "poi.business",
            elementType: "labels",
            stylers: [
              { visibility: "off" }
            ]
          }
        ];
        var myLatLng ={lat: 53.902930, lng: 27.598150};
	    var mapProp = {
			center: new google.maps.LatLng(53.902930, 27.598150),
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles : styleArray
		};
		
		var map = new google.maps.Map(document.getElementById("google-map"), mapProp);
		var image = '../img/map-marker.png';
		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			title: 'ItCreativeLab',
		    draggable: true,
		    animation: google.maps.Animation.DROP,
    		icon: image,
    		id: 'map-marker'
		});
	}

	function loadScript() {
	    var script = document.createElement("script");
	    script.type = "text/javascript";
	    script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyAlNg3eJiCSlF-d61TEQir7jqaPkOFNLd4&callback=initialize";
	    
	    document.body.appendChild(script);

	}

	loadScript();

}

