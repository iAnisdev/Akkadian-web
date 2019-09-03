/*------- Smooth Scroll -------*/
$('a[href^="#"]').on('click', function(event) {

    var target = $($(this).attr('href'));
    console.log(target)
    if (target.length) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000);
    }

});



/*------- Swiper Slider -------*/
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    paginationClickable: true,
    centeredSlides: true,
    autoplay: 3500,
    speed: 1500,
    loop: true,
    autoplayDisableOnInteraction: false
});



var ScrollPosStyler = (function(document, window) {
    "use strict";

    /* ====================
     * private variables
     * ==================== */
    var scrollPosY = 0,
        busy = false,
        onTop = true,

        // toggle style / class when scrolling below this position (in px)
        scrollOffsetY = 1,

        // choose elements to apply style / class to
        elements = document.getElementsByClassName("sps");


    /* ====================
     * private funcion to check scroll position
     * ==================== */
    function onScroll() {
        // ensure that events don't stack
        if (!busy) {
            // get current scroll position from window
            scrollPosY = window.pageYOffset;

            // if we were above, and are now below scroll position...
            if (onTop && scrollPosY > scrollOffsetY) {
                // suspend accepting scroll events
                busy = true;

                // remember that we are below scroll position
                onTop = false;

                // asynchronuously add style / class to elements
                window.requestAnimationFrame(belowScrollPos);

                // if we were below, and are now above scroll position...
            } else if (!onTop && scrollPosY <= scrollOffsetY) {
                // suspend accepting scroll events
                busy = true;

                // remember that we are above scroll position
                onTop = true;

                // asynchronuously add style / class to elements
                window.requestAnimationFrame(aboveScrollPos);
            }
        }
    }


    /* ====================
     * private function to style elements when above scroll position
     * ==================== */
    function aboveScrollPos() {
        // iterate over elements
        // for (var elem of elements) {
        for (var i = 0; elements[i]; ++i) { // chrome workaround
            // add style / class to element
            elements[i].classList.add("sps--abv");
            elements[i].classList.remove("sps--blw");
        }

        // resume accepting scroll events
        busy = false;
    }

    /* ====================
     * private function to style elements when below scroll position
     * ==================== */
    function belowScrollPos() {
        // iterate over elements
        // for (var elem of elements) {
        for (var i = 0; elements[i]; ++i) { // chrome workaround
            // add style / class to element
            elements[i].classList.add("sps--blw");
            elements[i].classList.remove("sps--abv");
        }

        // resume accepting scroll events
        busy = false;
    }


    /* ====================
     * public function to initially style elements based on scroll position
     * ==================== */
    var pub = {
        init: function() {
            // suspend accepting scroll events
            busy = true;

            // get current scroll position from window
            scrollPosY = window.pageYOffset;

            // if we are below scroll position...
            if (scrollPosY > scrollOffsetY) {
                // remember that we are below scroll position
                onTop = false;

                // asynchronuously add style / class to elements
                window.requestAnimationFrame(belowScrollPos);

                // if we are above scroll position...
            } else { // (scrollPosY <= scrollOffsetY)
                // remember that we are above scroll position
                onTop = true;

                // asynchronuously add style / class to elements
                window.requestAnimationFrame(aboveScrollPos);
            }
        }
    };


    /* ====================
     * main initialization
     * ==================== */
    // add initial style / class to elements when DOM is ready
    document.addEventListener("DOMContentLoaded", function() {
        // defer initialization to allow browser to restore scroll position
        window.setTimeout(pub.init, 1);
    });

    // register for window scroll events
    window.addEventListener("scroll", onScroll);


    return pub;
})(document, window);



var $element = $('.each-event, .title');
var $window = $(window);
$window.on('scroll resize', check_for_fade);
$window.trigger('scroll');

function check_for_fade() {
    var window_height = $window.height();

    $.each($element, function(event) {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_offset = $element.offset().top;
        space = window_height - (element_height + element_offset - $(window).scrollTop());
        if (space < 60) {
            $element.addClass("non-focus");
        } else {
            $element.removeClass("non-focus");
        }

    });
};

$('#subscribe').submit(function(e) {
    let email = $('#subscribeEmail').val()
    console.log('subscribe form submitted ', {
        email
    })
    e.preventDefault();
});

$("#contact-form").submit((e) => {
    let name = $('#contact_name').val()
    let email = $('#contact_email').val()
    let subject = $('#contact_subject').val()
    let message = $('#contact_message').val()
    console.log('contact-form submitted', {
        name,
        email,
        subject,
        message
    })
    e.preventDefault();
})