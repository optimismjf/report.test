$('.b-statistics__table-item').each(function(index, el) {
	
	var thisTable		= $(this);
	var firstCollWidth 	= thisTable.find('td').eq(0).innerWidth();
	var tableClone 		= thisTable.clone(true);

	tableClone
		.removeClass('b-statistics__table-item--original')
		.addClass('b-statistics__table-item--fake')
		.css('left', firstCollWidth + "px")
		.find('.b-statistics__table-item-inner')
			.css('margin-left',  "-" + firstCollWidth + "px");

	thisTable.after(tableClone);

});


// подстветка строки таблицы
$(document).on('mouseenter','.b-statistics__table tr:not(.description)', function(event) {
	var itemIndex = $(this).index();
	$(this).closest('.b-statistics__table').find('.b-statistics__table-item').each(function(index, el) {
		$(this).find('tr:eq('+itemIndex+')').addClass('js-hover');
	});

});

$(document).on('mouseleave','.b-statistics__table tr.js-hover', function(event) {
	$('tr.js-hover').removeClass('js-hover');
});

// подстветка ячейки таблицы
$(document).on('mouseenter', '.table-mark', function(event) {
	var itemMod = $(this).data('mod');
	$(this).closest('tr').find('.table-mark[data-mod="'+itemMod+'"]').addClass('js-hover');
});

$(document).on('mouseleave','.table-mark.js-hover', function(event) {
	$('.table-mark.js-hover').removeClass('js-hover');
});

// ключи без вхождений 
$('.b-statistics__key input').on('change', function(event) {
	var itemTableHidden = $('.b-statistics__table--hidden');

	if ($(this).is(':checked')) {
		itemTableHidden.slideDown();
	} else {
		itemTableHidden.slideUp();
	}
});