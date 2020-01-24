// Ключи без вхождения
$(document).on('click', '.b-reports-table__more', function(event) {
	event.preventDefault();

	var itemContent = $(this).closest('.b-reports-table').find('.b-reports-table__hidden');
	
	if ($(this).hasClass('js-opened')) {
		$(this).removeClass('js-opened');
		itemContent.stop().slideUp();
		
	} else {
		$(this).addClass('js-opened');
		itemContent.stop().slideDown();
	}
});

// удаление ключевика
$(document).on('click', '.b-reports-table__item-delete', function(event) {
	event.preventDefault();
	var deleteItem 		= $(this).closest('.b-reports-table__item');
	var tableWrap 		= $(this).closest('.b-reports-table');
	var deleteINewtem 	= $(this).closest('.b-reports-table__item--new');


	deleteItem.find('.b-reports-table__mark').html('');

	if (deleteINewtem.find('.b-reports-table__name input').val() == '') {
		deleteINewtem.remove();
	} else {

		// проверяем, если нет кнопки "добавить" добавляем 
		if (!deleteItem.find('.b-reports-table__item-add').length) {
		 	deleteItem.append('<a href="#" class="b-reports-table__item-add">добавить</a>');
		}
		// если нет блока для ключей без вхождения, создаём кнопку и блок
		if (!tableWrap.find('.b-reports-table__hidden').length) {
		 	tableWrap.find('.b-reports-table__add').prepend('<a href="#" data-open="Ключи без вхождения" data-close="Скрыть ключи без вхождения" class="b-reports-table__more"></a>');
		 	tableWrap.append('<div class="b-reports-table__hidden"></div>');
		}
		
		tableWrap.find('.b-reports-table__hidden').prepend(deleteItem);
	
	}

});

// добавление нового ключевика
var keywordItem = '<div class="b-reports-table__item b-reports-table__item--new"><div class="b-reports-table__name"><input type="text"></div><div class="b-reports-table__stat"></div><div class="b-reports-table__mark"><input type="text" placeholder="—"></div><div class="b-reports-table__mark b-reports-table__mark--no"><input type="text" placeholder="—"></div><div class="b-reports-table__mark b-reports-table__mark--no"><input type="text" placeholder="—"></div><a href="#" class="b-reports-table__item-delete">удалить</a></div>';

$('.b-reports-table__add-item').on('click', function(event) {
	event.preventDefault();
	var blockAdding = $(this).closest('.b-reports-table__add');

	
	blockAdding.before(keywordItem);
	blockAdding.prev('.b-reports-table__item').find('.b-reports-table__name input').focus();
	if ($(this).closest('.b-reports-table').hasClass('b-reports-table--min')) {
		blockAdding.prev('.b-reports-table__item').find('.b-reports-table__mark:eq(0), .b-reports-table__mark:eq(1)').remove();
	}

});

//  добавлениеключевика в основной список
$(document).on('click', '.b-reports-table__item-add', function(event) {
	event.preventDefault();
	var thisItem 		= $(this).closest('.b-reports-table__item');
	var itemWrap 		= thisItem.closest('.b-reports-table__hidden');
	var hiddenButton	= itemWrap.closest('.b-reports-table').find('.b-reports-table__more');

	thisItem.find('.b-reports-table__mark').html('<input type="text" placeholder="—">');
	$(this).closest('.b-reports-table').find('.b-reports-table__add').before(thisItem);

	if (!itemWrap.find('.b-reports-table__item').length) {
		itemWrap.remove();
		hiddenButton.remove();
	}

});
