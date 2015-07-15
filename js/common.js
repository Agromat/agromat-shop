head.ready(function() {

	// $(document).on("click", function(){
	// 	$(".js-popup").hide();
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


});