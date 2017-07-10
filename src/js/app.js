$(document).ready( function() {

    $(document).on("click", function(e){
        var tip = $(".js-tip");
        var selectList = $(".js-select-list");
        var popupFilter = $('.js-show-filter');
        var btnFilter = $('.js-popup-filter');
        var body = !$(e.target).closest(btnFilter).length && !$(e.target).closest(popupFilter).length;
        var selectCustom = $('.js-select-custom');

        if(tip.hasClass("is-active")) {
            tip.removeClass("is-active");
        }
        if(selectList.hasClass("is-active")) {
            selectList.removeClass("is-active");
        }
        if(body && popupFilter.hasClass('is-active')) {
            popupFilter.removeClass('is-active');
        }
        if(!$(e.target).closest(selectCustom).length ) {
            selectCustom.removeClass('is-active');
        }
    });

    function fixHeader() {
        var win = $(window).width() + scrollBarWidth();

        if(win > 640) {

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

    (function () {
      var isTouch = 'ontouchstart' in window,
          overlay = $(".js-overlay");

      // banned link click
      $(".js-nav li:not(.no-dropdown) a").on("click", function(){
          return false;
      });

      $(".js-nav a").each(function () {
        var link = $(this),
            parent = link.parent(),
            parentNodropdown = !parent.hasClass("no-dropdown"),
            index = parent.attr('data-item'),
            el = $('[data-index="'+index+'"]'),
            fixedHeader = $('body.has-fixed-header');

            // if(!!index) {
            //     $(window).on('load scroll resize', function() {
            //       var subnavPosition = $('[data-item="'+index+'"]').position().top + $('[data-item="'+index+'"]').height();
            //       el.css({top: subnavPosition});
            //     })
            // }

            if(!isTouch) {
              $('body').addClass('is-no-touch');
              link.hover(function() {
                if(parentNodropdown && !el.hasClass('is-visible')) {
                  el.add(overlay).addClass("is-visible");
                  parent.addClass("is-open");
                }
              }, function() {
                el.add(overlay).removeClass("is-visible");
                parent.removeClass("is-open");
              });
            } else {
              $('body').addClass('is-touch');
              link.click(function() {
                if(parentNodropdown && !el.hasClass('is-visible')) {
                  el.add(overlay).addClass("is-visible");
                  parent.addClass("is-open");
                } else {
                  el.add(overlay).removeClass("is-visible");
                  parent.removeClass("is-open");
                }
              });
            }
      });

      $(".js-subnav").each(function() {
        var subnav = $(this),
            index = +subnav.attr("data-index")-1,
            li = $(".js-nav li");

        subnav.hover(function() {
            $(this).add(overlay).addClass("is-visible");
            li.eq(index).addClass("is-open");
        }, function() {
            $(this).add(overlay).removeClass("is-visible");
            li.eq(index).removeClass("is-open");
        });
      });
    }());

    $(document).on('click touchstart', function(e) {
        var element = $('.js-subnav'),
            navLi = $(".js-nav li"),
            overlay = $('.js-overlay');

        if (!$(e.target).closest('.js-subnav').length) {
          element.add(overlay).removeClass('is-visible');
          navLi.removeClass('is-open');
        }
    });

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

    $('.js-img-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
      $(".js-slide-index").text(nextSlide+1);
    });

    $(".js-popup-trigger").on("click", function(){

        var popup = $(this).attr("data-popup");
        $('body').addClass('is-hidden');
        $(".js-popup").fadeOut(200);
        $("."+popup).fadeIn(200);
        $(window).trigger("resize");

        if ($(this).data('slide-index')) {
            var currentSlideIndex = $(this).data('slide-index');
            initPopupSlick(currentSlideIndex);
        }
        return false;
    });

    function initPopupSlick(currentSlideIndex){
        var option = {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            adaptiveHeight: true,
            initialSlide: currentSlideIndex - 1
        };

        $(".js-img-slider").slick(option);
        $(".js-slide-index").text(currentSlideIndex);
    };


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
            });
        });
    }
    number();

    $(".js-del-parent").on("click", function(){
        $(this).parents(".js-parent").remove();
        return false;
    });

    $(".js-slick-prev-trigger").on('click', function() {
        $(this).parent().find(".slick-slider .slick-prev").trigger("click");
        return false;
    });
    $(".js-slick-next-trigger").on('click', function() {
        $(this).parent().find(".slick-slider .slick-next").trigger("click");
        return false;
    });

    //init all sliders
    (function () {
        var slider = $(".js-slider");
        var sliderIndex = $('.js-slider-index');
        var sliderAction = $('.js-slider-action');
        var sliderSix = $(".js-slider-six");
        var sliderSixSmall = $(".js-slider-six_small");
        var sliderShares= $('.js-slider-shares');
        var sliderSingle= $(".js-single-slider");
        var sliderPost= $(".js-post-slider");
        var carouselMain = $('.js-carousel-main');
        var carouselNav =  $('.js-carousel-nav');
        var sliderImg =  $(".js-item-slider");

        initSlider(sliderImg, {
            adaptiveHeight: true
        });
        initSlider(slider, {
            slidesToShow: 4,
            slidesToScroll: 4,
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
        initSlider(sliderIndex, {
            dots: true
        });

        initSlider(sliderAction, {
            dots: false
        });
        initSlider(sliderSix, {
            slidesToShow: 6,
            slidesToScroll: 6,
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
            ]
        });
        initSlider(sliderSixSmall, {
            slidesToShow: 6,
            slidesToScroll: 6,
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
        initSlider(sliderShares, {
            centerMode: true,
            arrows: false,
            adaptiveHeight: true
        });
        initSlider(sliderSingle, {
            dots: true,
            adaptiveHeight: true
        });
        initSlider(sliderPost, {
            slidesToShow: 2,
            slidesToScroll: 2,
            adaptiveHeight: true
        });
        initSlider(carouselMain, {
            fade: true,
            asNavFor: '.js-carousel-nav',
            responsive: [
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 2,
                        centerMode: true,
                        slidesToScroll: 1,
                        fade: false,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        centerMode: true,
                        slidesToScroll: 1,
                        fade: false,
                    },
                },
            ],
        });
        initSlider(carouselNav, {
            slidesToShow: 4,
            slidesToScroll: 1,
            variableWidth: true,
            asNavFor: '.js-carousel-main',
            arrows: false,
            focusOnSelect: true,
        });
        function initSlider(slider, option) {
            slider.on('init', function() {
                setTimeout(function(){
                    slider.addClass('is-ready');
                },200);
            });
            slider.not('.slick-initialized').slick(option);
        }
    })();
    
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

    });

    $(".js-radiobox-tab input").on("change", function() {
        var id = $(this).attr("id");

        $('.js-radiobox-content').hide();
        $('.js-radiobox-content[data-id="'+id+'"]').show();

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
        $('.js-img-slider').slick('unslick');
        return false;
    });
    $(".js-popup-overlay").on("click",function (){
        $(".js-popup").fadeOut(200);
        $('.js-img-slider').slick('unslick');
        return false;
    });


    $(".js-show-callback").on("click", function(){
        $(this).parents(".contact").find(".js-callback").toggleClass("is-active");
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

    //accordion
    $('.js-clicker').click(function(e) {
        e.preventDefault();

        var that = $(this);
        var el = that.parent('.js-item');
        var noClass = !el.hasClass('is-dropdown')
        var item = $('.js-item');

        if(noClass) {
            el.addClass('is-dropdown')
              .siblings()
              .removeClass('is-dropdown')
          } else {
            item.removeClass('is-dropdown')
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
        $('.js-show-filter').toggleClass('is-active');
    });
    $('.js-close-filter').click(function() {
        $(this).parent('.js-show-filter').removeClass('is-active');
    });

    $('.js-show-text').click(function(e) {
        var txt = $('.article__text'),
            that = $(this);
        e.preventDefault();

        if(!txt.hasClass('is-show')) {
            txt.addClass('is-show');
            that.text('Свернуть текст').addClass('is-changed');
        } else {
            txt.removeClass('is-show');
            that.text('Развернуть текст').removeClass('is-changed');
        }
    });
    //select sort
    function select() {
        var select = $('.sort');
        var selectLink = $('.sort > a');
        var placeholder = $('.sort > span');
        var winMob = $(window).width() + scrollBarWidth();

        if(winMob <= 640) {
            selectLink.wrapAll('<ul class="sort__list"></ul>')
                      .wrap('<li></li>');

            select.click(function() {
                $(this).toggleClass('is-show');
            });

            selectLink.click(function() {
               placeholder.text($(this).text());
            })
        }
    }
    select();

    //select categories
    $('.js-select-custom').click(function() {
        $(this).toggleClass('is-active');
    });
    $('.js-select-custom .box__nav a').click(function() {
        $('.js-select-custom-text').text($(this).text());
    });

    //dropdown sections
    $('.js-drop-down').click(function () {
        var that    = $(this),
            section = $(this).parents('.section'),
            time    = 300,
            winMob  = ($(window).width() + scrollBarWidth()) < 641

            console.log(($(window).width() + scrollBarWidth()));

         if(winMob) {
            if(!(section.hasClass('is-drop'))) {
               that.find('~ *').stop(true).slideDown(time).parents('.section').addClass('is-drop');
               // section.addClass('is-drop');
            } else {
               that.find('~ *').stop(true).slideUp(time).parents('.section').removeClass('is-drop');
               // section.removeClass('is-drop');
            }
         }
    });

});

// код для отображения попапа с iframe, подтягивающим опросник с HotJar
$(function (){
    $('.js-questionnaire').on('click', function() {
        $('.js-popup').show();
    });
    $('.js-popup-overlay').on('click', function(){
        $('.js-popup').hide();
    });
    $('.js-close-popup').on('click', function(){
        $('.js-popup').hide();
    });
});
