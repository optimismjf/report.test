// disabled по checkbox 
$('.b-task__checkbox input').on('change', function(event) {
	var itemTableHidden = $(this).closest('.b-task__item').find('.b-task__item-content');

	if ($(this).is(':checked')) {
		itemTableHidden.removeClass('js-disabled');
	} else {
		itemTableHidden.addClass('js-disabled');
	}
});

// выбор пункта select
$('.b-reports-select--task select').on('change.select2', function (e) {
	$('.b-reports-select-list').slideUp();
	var selectedIndex = $(".b-reports-select--task select option:selected").index();
	$('.b-reports-select-list').eq(selectedIndex).slideDown();
});

// кнопки prev - next 
$('.b-reports-select__button').on('click', function(event) {
	event.preventDefault();

	var listSelect 			= $(".b-reports-select--task select");
	var listSelectLength	= listSelect.find("option").length - 1;
	var listActiveIndex 	= listSelect.find("option:selected").index();
	var changeIndex 		= 0;

	if ($(this).hasClass('b-reports-select__button--next')) {
		changeIndex = listActiveIndex + 1;
	} else {
		changeIndex = listActiveIndex - 1;
	}
	
	if (changeIndex <= listSelectLength && changeIndex >= 0) {
		listSelect.find('option').eq(changeIndex).prop('selected', true);
		listSelect.trigger('change.select2');
	}

});

//  стилизацияскролла в блоке со словами 
if ($('.b-task-word__content-inner').length) {
	$('.b-task-word__content-inner').niceScroll({
      mousescrollstep: 10,
      cursorcolor: '#A2AEB7',
    });
}
// добавление слов в тз 
$(document).on('click', '.b-task-word__content--list .b-task-word__item-title', function(event) {
	event.preventDefault();
	var thisTtext		= $(this).find('span').html();
	var thisItem		= $(this).closest('.b-task-word__item').clone(true);

	var wordTextarea 	= $('.b-task-word__content--selected textarea');
	var wordTextareaVal = wordTextarea.val();


	if ($(this).hasClass('js-selected')) {

		wordTextarea.val('');

		wordTextareaVal.split('\n').forEach( function(line, index) {
			if (line != thisTtext && line != "") {
				if (wordTextarea.val() != "") {
					wordTextarea.val(wordTextarea.val()+'\n'+line)
				} else {
					wordTextarea.val(line)
				}
			} 
		});
		
	} else {
		wordTextarea.val(thisTtext+'\n'+wordTextarea.val());
	}
	$(this).toggleClass('js-selected');
});

/* вкладки слова */
/*========================*/
$('.b-task-tabs a').on('click', function(event) {
	event.preventDefault();
	if (!$(this).hasClass('js-active')) {
		$('.b-task-tabs a').removeClass('js-active');
		$('.b-task-tabs-block').slideUp();
		var activeItem = $(this).attr('href');
		$(this).addClass('js-active');
		$(activeItem).slideDown(function() {
			$( ".b-task-word__content-inner").getNiceScroll().resize();
		});
	}
});

// добавление тематических слов при первой загрузке
if ($('.b-task-word').length) {
	var wordTextarea = $('.b-task-word__content--selected textarea');

	$('.js-selected').each(function(index, el) {
		if (wordTextarea.val() != "") {
			wordTextarea.val(wordTextarea.val()+'\n'+$(this).find('span').html());
		} else {
			wordTextarea.val($(this).find('span').html());
		}
	});
}

// добавление тематических слов при вводе в textarea
 $('.b-task-word__content--selected textarea').on('keyup', function(event) {
 	var wordTextarea = $(this);
	var wordTextareaVal = wordTextarea.val().split('\n');

	$('.b-task-word__item-title').removeClass('js-selected');
	
	wordTextareaVal.forEach( function(line, index) {
		if (line != "") {
			$('.b-task-word__item-title')
				.find('[data-text="'+line+'"]')
				.closest('.b-task-word__item-title')
				.addClass('js-selected');
		}
	});
 	
 });