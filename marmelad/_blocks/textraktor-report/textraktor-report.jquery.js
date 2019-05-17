/* вкладки отчёт */
/*========================*/
$('.b-reports-tabs a').on('click', function(event) {
	event.preventDefault();
	if (!$(this).hasClass('js-active')) {
		$('.b-reports-tabs a').removeClass('js-active');
		$('.b-reports-tabs-block').hide();
		var activeItem = $(this).attr('href');
		 $(this).addClass('js-active');
		 $(activeItem).show();

	}
});