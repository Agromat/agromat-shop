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