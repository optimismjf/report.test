/* подсказка */
/*========================*/

$(document).on('click', '.b-help__button', function(event) {
	event.preventDefault();

	var helpWrap = $(this).closest('.b-help');
	helpWrap.toggleClass('js-opened');

});