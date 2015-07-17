$(document).ready( function() {

    // $(document).on("click", function(){
    //  $(".js-popup").hide();
    // });

    // function scrollFixedElements() {
    //     var scroll_left = $(this).scrollLeft();
    //     $(".fixed-element").css({
    //         left: -scroll_left
    //     });
    // }
    // scrollFixedElements();
    // $(window).scroll(function(){
    //     scrollFixedElements()
    // });
    $(".js-nav a").on("click", function(){
        var parent = $(this).parent();
        var index = +parent.index()+1;
        $('[data-index="'+index+'"]').toggleClass("is-visible");
        parent.toggleClass("is-open");
        $(".js-overlay").toggleClass("is-visible");
    });
    var timeout;
    $(".js-overlay").hover(
        function() {    
            var self = $(this);
            timeout = setTimeout(function(){
                $(".js-subnav").removeClass("is-visible");
                $(".js-nav li").removeClass("is-open");
                self.removeClass("is-visible");
            }, 1000);           
        }, function() {
            clearTimeout(timeout);
        }
    );
    $(".js-overlay").on("click", function(){
        $(".js-subnav").removeClass("is-visible");
        $(".js-nav li").removeClass("is-open");
        $(this).removeClass("is-visible");
    });

    $(".js-btn-more").on("click", function(){
        var hiddenText = $(this).attr("data-text");
        var visibleText = $(this).text();
        $(this).text(hiddenText);
        $(this).attr("data-text", visibleText);
        $(this).toggleClass("is-active").parents(".js-accord").toggleClass("is-full-list");
        return false;
    });

    $(".js-accord-title").on("click", function(){
        var accord =  $(this).parents(".js-accord");
        if (accord.hasClass("is-open")) {
            accord.removeClass("is-open")
            accord.find(".js-accord-body").slideUp(200);
        }
        else {
            accord.addClass("is-open")
            accord.find(".js-accord-body").slideDown(200);
        }
        return false;
    });
    $(".js-item-slider").slick({
        slideToShow: 1,
        slideToScroll: 1,
        dots: false,
        arrows: true
    });

    $(".js-clear-filter").on("click", function(){
        $(this).parents(".js-filter").find("input").removeAttr("checked");
        $(this).parents(".js-filter-choice").remove();
        return false;
    });

});