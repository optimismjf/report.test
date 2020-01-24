$('.b-authorization__event').on('click', function(event) {
	event.preventDefault();
	var activeForm = $(this).attr('href');
	$('.b-authorization__content').slideUp();
	$(activeForm).slideDown();
});

// подсказка выезжающая
$('.b-authorization__find').on('click', function(event) {
	event.preventDefault();
	$('.b-authorization__list--hidden').slideToggle();
});