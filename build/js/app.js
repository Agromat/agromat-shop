$(document).ready( function() {

    $(document).on("click", function(){
        if($(".js-tip").hasClass("is-active")) {
            $(".js-tip").removeClass("is-active")
        }  
        if($(".js-select-list").hasClass("is-active")) {
            $(".js-select-list").removeClass("is-active")
        }
    });

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
        var win = $(window).width();

        if(win > 1024) {

            var scroll = $(document).scrollTop();
            var top = +$(".header").outerHeight()+$(".nav-wrap").outerHeight();

            if (scroll >= top) {
                $("body").addClass("has-fixed-header");
            }
            else {
                 $("body").removeClass("has-fixed-header");
            }
        } else { 
            $("body").removeClass("has-fixed-header");
        }
    }
    // fixheader()
    $(window).on('scroll resize', fixHeader);

    // banned link click
    $(".js-nav li:not(.no-dropdown) a").on("click", function(){
        return false;
    });

    $(".js-nav a").hover( function(){
            if (!$(this).parent().hasClass("no-dropdown")) {
                var parent = $(this).parent();
                var index = +parent.index()+1;
                $('[data-index="'+index+'"]').addClass("is-visible");
                parent.addClass("is-open");
                $(".js-overlay").addClass("is-visible");
            }
            
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
            var index = +$(this).attr("data-index")-1;
            $(this).addClass("is-visible");
            $(".js-nav li").eq(index).addClass("is-open");
            $(".js-overlay").addClass("is-visible");
        },
        function(){
            var index = +$(this).attr("data-index")-1;
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

    function findInputs(elem) {
        elem.each(function() {
            var el = $(this),
                len = el.find('input:checked').length;

            if (el.find('input').is(':checked') && ($(window).width() + scrollBarWidth()) <= 640  ) {
                el.find('.js-accord-title span span').text(len);
                el.find('.js-accord-title').addClass('is-show');
            } 

            else if (len === 0 && ($(window).width() + scrollBarWidth()) > 640) {
                el.find('.js-accord-title').removeClass('is-show');
            } else {
                el.find('.js-accord-title').removeClass('is-show');
            }
        });
    };

    $(".js-accord-title").on("click", function(){
        var accord    =  $(this).parents(".js-accord"),
            len   = accord.find('input:checked').length,
            el        = accord.find('.js-accord-title span span');

        if (accord.hasClass("is-open")) {
            accord.removeClass("is-open")
            accord.find(".js-accord-body").slideUp(200);

            findInputs(accord);

        }
        else {
            accord.addClass("is-open")
            accord.find(".js-accord-body").slideDown(200);
        }
        return false;
    });

    function mobileAccord() {
        var win        = $(window).width() + scrollBarWidth(),
            mobile     = win <= 640,
            title      = $(".js-accord-title"),
            accord     = title.parents(".filter-popup .js-accord"),
            accordBody = accord.find(".js-accord-body"),
            filter     = $('.js-filter'),
            that       = $(this);

        if(mobile) {
            accord.removeClass('is-open');
            accordBody.slideUp(200);
        } else {
            accord.addClass('is-open');
            accordBody.slideDown(200);
        }
    }

    $(window).on('load resize', function() {
        mobileAccord();
        findInputs($(".js-accord"));
    });

    // width scroll
    function scrollBarWidth() {
        var block        = $('<div>').css({'width': '50px', 'height': '50px'}),
            innerElement = $('<div>').css({'height': '300px'});

        $('body').append(block.append(innerElement));

        var width1 = $('div', block).innerWidth();

        block.css('overflow-y', 'scroll');
        var width2 = $('div', block).innerWidth();

        $(block).remove();

        return (width1 - width2);
    }

    $(".js-item-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true
    });

    $(".js-img-slider").on("init", function(){
        setTimeout(function(){
            $('.js-img-slider').parent().addClass("is-ready");
        },200);
        var counter = $(".js-img-slider").find(".slick-slide").last().attr("data-slick-index");
        if (counter == 0) {
            counter = 1;
        }
        $(".js-slides-counter").text(counter);
    });
    $(".js-img-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true
    });
    $('.js-img-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
      $(".js-slide-index").text(nextSlide+1);
    });


    $(".js-clear-filter").on("click", function(){
        $(this).parents(".js-filter").find("input").removeAttr("checked");
        $(this).parents(".js-filter-choice").remove();
        if($('.filter-popup .accord__title').hasClass('is-show')) {
            $('.filter-popup .accord__title').removeClass('is-show');
        }
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

    $('.js-slider').on('init', function(slick) {
        setTimeout(function(){
           $('.js-slider').addClass("is-ready");
        },200);
    });
    $(".js-slider").slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: false,
        arrows: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 2,
                    centerMode: true,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    slidesToScroll: 1,
                },
            }
        ],
    });
    $(".js-slider-five").slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        dots: false,
        arrows: true,
        adaptiveHeight: true
    });
     $('.js-slider-six').on('init', function(slick) {
          setTimeout(function(){
            $('.js-slider-six').addClass("is-ready");
          },200);
    });
    $(".js-slider-six").slick({
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 6,
        dots: false,
        arrows: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: false,
                },
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 2,
                    centerMode: true,
                    slidesToScroll: 2,
                    arrows: false,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    slidesToScroll: 1,
                    arrows: false,
                },
            }
        ]
    });
     $('.js-slider-six_small').on('init', function(slick) {
          setTimeout(function(){
            $('.js-slider-six_small').addClass("is-ready");
          },200);
    });
    $(".js-slider-six_small").slick({
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 6,
        dots: false,
        arrows: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                }
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
        ]
    });

    $(".js-slick-prev-trigger").on('click', function() {
        $(this).parent().find(".slick-slider .slick-prev").trigger("click");
        return false;
    });
    $(".js-slick-next-trigger").on('click', function() {
        $(this).parent().find(".slick-slider .slick-next").trigger("click");
        return false;
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

    $('.js-slider-index').on('init', function(slick) {
          setTimeout(function(){
            $('.js-slider-index').addClass("is-ready");
          },200);
    });
    $(".js-slider-index").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        adaptiveHeight: false
    });
    $('.js-slider-mob').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        dots: false,
        arrows: false,
        adaptiveHeight: true
    });

    $(".js-scroll-top").on("click", function(){
        $('html, body').animate({
            scrollTop: 0
        }, 100);
        return false;
    });

    var lastScrollTop = 0;
    $(window).scroll(function(event){
       var st = $(this).scrollTop();
       if (st > lastScrollTop){
            if (!$(".js-scroll-top").hasClass("is-visible")) {
                $(".js-scroll-top").addClass("is-visible");
            }
           
       } else {
        if ($(".js-scroll-top").hasClass("is-visible")) {
            $(".js-scroll-top").removeClass("is-visible");
        }
       }
       lastScrollTop = st;
    });

    $('#countdown-1').countdown({
        until: new Date(2015, 7, 30, 0, 0, 0), // insert your date
        format: 'DHM',
        padZeroes: true
    });

    $('.js-carousel-main').on('init', function(slick) {
          setTimeout(function(){
            $('.js-carousel-main').addClass("is-ready");
          },200);
    });
    $('.js-carousel-main').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.js-carousel-nav',
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    centerMode: true,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: false,
                },
            },
        ],

    });
    $('.js-carousel-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.js-carousel-main',
        dots: false,
        arrows: false,
        centerMode: false,
        focusOnSelect: true,
    });

    $('.js-tip-trigger').on("click", function(event){
        var top = $(this).offset().top;
        var left = $(this).offset().left;
        var text = $(this).data("text");
        $(".js-tip").css({
            top: top,
            left: left - 175,
        }).toggleClass("is-active").children().text(text);
        event.stopPropagation();
        return false;
    });
    $(".js-tip").on("click", function(event){
        event.stopPropagation();
    });

    $(".js-select-list-active").on("click", function(event){
        $(this).parents(".js-select-list").toggleClass("is-active");
        event.stopPropagation();
    });

    $(".js-select-list-drop a").on("click", function(event) {
        var text = $(this).text();
        $(this).parents(".js-select-list").removeClass("is-active").find(".js-select-list-active span").text(text);
        event.stopPropagation();
    });

    // $('[type="tel"]').mask("380(99)999-99-99");

    $(".js-select select").on("change", function() {
        var text = $(this).val();
        $(this).parents(".js-select").find(".input").val(text);
    });

    $(".js-radio-trigger").on("change", function() {
        var parent = $(this).parents(".js-radio-parent");
        var name = $(this).attr("name");

        $('input[name="'+name+'"]').parents(".js-radio-parent").removeClass("is-active");

        $(this).attr("checked", "checked");
        parent.addClass("is-active");
        // if ($(this).is(":checked")) {
            
        // }
    });

    $(".js-radiobox-tab input").on("change", function() {
        var id = $(this).attr("id");

        $('.js-radiobox-content').hide();
        $('.js-radiobox-content[data-id="'+id+'"]').show();


        // $(this).attr("checked", "checked");
        // parent.addClass("is-active");
        // if ($(this).is(":checked")) {
            
        // }
    });

    $(".js-overlay-main").on("click", function() {
        $(this).fadeOut(200);
    });
    $(".js-overlay-main").children().on("click", function(event) {
        event.stopPropagation();
    });

        function loadTabs() {
            var hash = window.location.hash;
            if (hash) {
                $('[href="'+hash+'"]').parents(".js-tabs-group").find(".js-tabs-content").hide();
                $('[data-id="'+hash+'"]').show();
                $('[href="'+hash+'"]').parents(".js-tabs").find("li").removeClass("is-active");
                $('[href="'+hash+'"]').parent().addClass("is-active");
            }
            else if ($(".js-tabs li.is-active").length) {
                $(".js-tabs").each(function(){
                    if ($(this).find(".is-active").length) {
                        var hash = $(this).find(".is-active a").attr("href");
                        $('[data-id="'+hash+'"]').show();
                        window.location.hash = hash;
                    }
                });
            }
            else {
                $('.js-tabs li:first').addClass("is-active");
                $('.js-tabs').next().show();
                
            }
            
        }
       loadTabs();
       // alert(hash);
        $('.js-tabs a').on("click",function (e) {
            var content = $(this).attr("href");
            $(this).parents(".js-tabs").find("li").removeClass("is-active");
            $(this).parent().addClass("is-active");
            $(this).parents(".js-tabs-group").find(".js-tabs-content").hide();
            $('[data-id="'+content+'"]').show();
            window.location.hash = this.hash;
            return false;
        });


    $(".js-close-popup").on("click",function (){
        $(this).parents(".js-popup").fadeOut(200)
        return false;
    });
    $(".js-popup-overlay").on("click",function (){
        $(".js-popup").fadeOut(200)
        return false;
    });

    $(".js-popup-trigger").on("click", function(){
        var popup = $(this).attr("data-popup");
        $('body').addClass('is-hidden');
        $(".js-popup").fadeOut(200);
        $("."+popup).fadeIn(200);
        $(window).trigger("resize");
        return false;
    });

    $(".js-show-callback").on("click", function(){
        $(".js-callback").toggleClass("is-active");
        $(this).toggleClass("is-active");
        return false;
    });

    //dropdown
    
    $('.breadcrumbs .has-drop > a').click(function(e) {
        e.preventDefault();

        var that    = $(this),
            el      = that.siblings('.breadcrumbs__drop'),
            _parent = el.parent('.has-drop');

        el.toggleClass('is-show');
        _parent.toggleClass('is-active');
    })

    $('.js-clicker').click(function(e) {
        e.preventDefault();

        var that = $(this);
        var el = that.parent('.js-item');
        var trigger = $('.js-clicker');
        var item = $('.js-item');
        var inner = $('.js-inner');

        if(!el.hasClass('is-dropdown')) {
            item.removeClass('is-dropdown');
            trigger.removeClass('is-active');
            el.addClass('is-dropdown');
            that.addClass('is-active');
        }
        else if(el.hasClass('is-dropdown')) {
            el.removeClass('is-dropdown');
            that.removeClass('is-active');
        }
        else {
            item.removeClass('is-dropdown');
            trigger.removeClass('is-active');
        }
    });

    //accordion
    $('.js-trigger').on('click', function(e) {
        e.preventDefault();

        var that         = $(this),
            item         = that.parent('.accordion__item'),
            list         = that.parent('.accordion'),
            items        = list.find('.accordion__item'),
            content      = item.find('.accordion___inner'),
            otherContent = list.find('accordion___inner'),
            duration     = 300;

        if(!item.hasClass('is-active')) {
            items.removeClass("is-active");
            item.addClass('is-active');

            otherContent.stop(true, true).slideUp(duration);
            content.stop(true, true).slideDown(duration);
        } else {
            content.stop(true, true).slideUp(duration);
            item.stop(true, true).removeClass("is-active");
        }

    });
    //mobile-menu
    $('.js-btn-menu-mob').click(function() {
        var nav  = $('.navigation'),
            that = $(this);

        that.toggleClass('is-open');
        nav.toggleClass('is-visible');
        $('body').toggleClass("is-hidden");
    });

    //popup 
    $('.js-open-popup').click(function(e) {
        e.preventDefault();
        
        var link  = $(this).data('link'),
            popup = $('.js-mob-popup[data-popup="' + link + '"]');

        popup.addClass('is-active');
        $("body").addClass("is-hidden");
    });

    $(".js-close-popup").on("click",function (){
        $(this).parents(".js-mob-popup").removeClass('is-active');
        $("body").removeClass("is-hidden");
        return false;
    });

    $('.js-popup-filter').click(function() {
        $('.js-show-filter').addClass('is-active');
    });
    $('.js-close-filter').click(function() {
        $(this).parent('.js-show-filter').removeClass('is-active');
    });

    $('.js-show-text').click(function(e) {
        e.preventDefault();

        var that   = $(this),
            content = that.parent('.article__text');

        that.css({
            "display" : "none",
        });

        content.removeClass("is-hidden-mob");

    });

    //select

    function select() {
        var el   =  $('.sort > span'),
            flag = false;

        el.click(function() {
            if(!el.parents('.sort').hasClass('is-show'))
                $(this).parents('.sort').addClass('is-show');
            else
                $(this).parents('.sort').removeClass('is-show');
        });

        function mobileSelect() {
            
            var child    = $('.sort > a'),
                list     = child.wrapAll("<ul class='sort__list'></ul>"),
                listLink = $('.sort__list').find('a');

                listLink.click(function(e) {
                    var contentLink = $(this).text(),
                        link        = $(this)

                    $('.sort > span').text(contentLink).parents('.sort').removeClass('is-show');
                    e.stopPropagation()

                });
        }

        function windowSize() {
            var width = $(window).width() + scrollBarWidth();

            if(width <= 640 && flag == false) {
                flag = true;

                mobileSelect();

            } else if(width > 640 && flag == true) {
                flag = false;
                $('.sort__list a').unwrap();

                el.removeClass('is-show');
                $('.sort > span').text('Сортировка:');

            }
        }

        $(window).on('resize load', windowSize);
    }

    select();

    $('.a-category').click(function() {
        $(this).toggleClass('is-active');
    });
    //sticky footer
    function stickyFooter() {
        var docHeight    = $(document).height(),
            winHeight    = $(window).height(),
            footerHeight = $('.footer').height();

        if (docHeight <= winHeight) {
            $('.out').height(
                winHeight - footerHeight
            );
        }
        console.log("высота футера " + footerHeight);
        console.log("высота документа " + docHeight);
        console.log("высота окна " + winHeight);
    }
    stickyFooter();

    //dropdown sections
    $('.js-drop-down').click(function () {
        var that    = $(this),
            section = $(this).parents('.section'),
            time    = 300;

         if(!(section.hasClass('is-drop'))) {
            that.find('~ *').stop(true).slideDown(time).parents('.section').addClass('is-drop');
            // section.addClass('is-drop');
         } else {
            that.find('~ *').stop(true).slideUp(time).parents('.section').removeClass('is-drop');
            // section.removeClass('is-drop');
         }

    })
});