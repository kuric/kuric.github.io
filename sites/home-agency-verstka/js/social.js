$(function() {
	$('.share__btn').on('click', function() {
		$('.social').slideToggle();
	});
});

$(function() {
	$('.info__item').on('click', function() {
		$(this).children('.info__link').slideToggle();
	});
});

