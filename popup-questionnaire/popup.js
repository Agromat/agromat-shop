$(function (){
	$('button.js-questionnaire').on('click', function() {
		$('div.js-popup').show();
	});
	$('div.js-popup-overlay').on('click', function(){
		$('div.js-popup').hide();
	});
	$('button.js-close-popup').on('click', function(){
		$('div.js-popup').hide();
	});
});