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
    function fixHeader() {
        var scroll = $(document).scrollTop();
        var top = +$(".header").outerHeight()+$(".nav-wrap").outerHeight();
        if (scroll >= top) {
            $("body").addClass("has-fixed-header");
        }
        else {
             $("body").removeClass("has-fixed-header");
        }
    }
    fixHeader();
    $(window).scroll(function(){
        fixHeader();
    });

    // banned link click
    $(".js-nav a").on("click", function(){
        return false;
    });

    $(".js-nav a").hover( function(){
            var parent = $(this).parent();
            var index = +parent.index()+1;
            $('[data-index="'+index+'"]').addClass("is-visible");
            parent.addClass("is-open");
            $(".js-overlay").addClass("is-visible");
        },
        function(){
            var parent = $(this).parent();
            var index = +parent.index()+1;
            $('[data-index="'+index+'"]').removeClass("is-visible");
            parent.removeClass("is-open");
            $(".js-overlay").removeClass("is-visible");
        }
    );
    $(".js-subnav").hover( function(){
            var index = +$(this).index()-1;
            $(this).addClass("is-visible");
            $(".js-nav li").eq(index).addClass("is-open");
            $(".js-overlay").addClass("is-visible");
        },
        function(){
            var index = +$(this).index()-1;
            $(this).removeClass("is-visible");
            $(".js-nav li").eq(index).removeClass("is-open");
            $(".js-overlay").removeClass("is-visible");
        }
    );
    // var timeout;
    // $(".js-overlay").hover(
    //     function() {    
    //         var self = $(this);
    //         timeout = setTimeout(function(){
    //             $(".js-subnav").removeClass("is-visible");
    //             $(".js-nav li").removeClass("is-open");
    //             self.removeClass("is-visible");
    //         }, 1000);           
    //     }, function() {
    //         clearTimeout(timeout);
    //     }
    // );
    // $(".js-overlay").on("click", function(){
    //     $(".js-subnav").removeClass("is-visible");
    //     $(".js-nav li").removeClass("is-open");
    //     $(this).removeClass("is-visible");
    // });

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
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true
    });


    $(".js-clear-filter").on("click", function(){
        $(this).parents(".js-filter").find("input").removeAttr("checked");
        $(this).parents(".js-filter-choice").remove();
        return false;
    });

    function number() { 
        var number = $(".js-number");
        number.each(function(){
            var max_number = +($(this).attr("data-max-number"));
            var input = $(this).find("input");
            var plus = $(this).find(".js-plus-number");
            var minus = $(this).find(".js-minus-number");
            plus.on("click", function(){
                var val = +(input.val());
                if (val >= max_number) {
                    return false
                }
                else {
                    val += 1;
                    input.val(val);
                }
            });
            minus.on("click", function(){
                var val = +(input.val());
                if (val > 1) {
                    val -= 1;
                    input.val(val);
                }
                return false;
            });
            input.on("change", function(){
                var val = +$(this).val();
                if (val > max_number) {
                    val = max_number;
                    $(this).val(val);
                }
                if (val == '') {
                    val = 1;
                    $(this).val(val);
                }
            });
            input.on('keyup', function(){
                var value = $(this).val();
                var re = /[^0-9.]/;
                if (re.test(value)) {
                    value = value.replace(re, '');
                    $(this).val(value);
                }
                    // set max and min value
                // if($(this).val()*2 === "NaN") {
                //     $(this).addClass('has-error');
                // } else {
                //     $(this).removeClass('has-error');
                // }
            });
        });
    }
    number();

    $(".js-del-parent").on("click", function(){
        $(this).parents(".js-parent").remove();
        return false;
    });

    $(".js-post-slider").slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: false,
        arrows: true,
        adaptiveHeight: true
    });

    $(".js-slider").slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: false,
        arrows: true,
        adaptiveHeight: true
    });
    $('.js-single-slider').on('init', function(slick) {
          setTimeout(function(){
            $('.js-single-slider').addClass("is-ready");
          },200);
    });
    $(".js-single-slider").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        adaptiveHeight: true
    });

    $(".js-scroll-top").on("click", function(){
        $('html, body').animate({
            scrollTop: 0
        }, 100);
        return false;
    });

    $('#countdown-1').countdown({until: new Date(2015, 6, 30, 0, 0, 0), format: 'DHM'});
});