$(document).on('click', '.b-reports__entrance', function(event) {
	event.preventDefault();
	$(this).toggleClass('js-active');
});

$(document).on('click', '.b-reports__button', function(event) {
	event.preventDefault();

	var itemContent = $(this).closest('.b-reports').find('.b-reports__content');
	
	if ($(this).hasClass('js-close')) {
		$(this).removeClass('js-close');
		itemContent.stop().slideDown();
		
	} else {
		$(this).addClass('js-close');
		itemContent.stop().slideUp();
	}

});