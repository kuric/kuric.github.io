	$('.social__link').hover(function() {
		$(this).addClass(' wow animated jello');
	});
	$('.social__link').mouseleave(function() {
		$(this).removeClass(' wow animated jello');
	});
	$('.entry__img').hover(function() {
		$(this).addClass(' wow animated pulse');
	});
	$('.filter__link').on('click', function(e) {
		$('.filter__link').css('background',' #ebcc8d');
		e.preventDefault();
		$(this).css('background','white');
	});