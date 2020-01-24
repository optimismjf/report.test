/* подбор конкурентов */
/*========================*/
$('.b-challenge__item--picking input[type="radio"]').on('change', function(event) {
	
	var autoFit = $('.js-auto-fit');

	if ($(this).is(':checked') && $(this).attr('id') == 'radio2') {
		autoFit.fadeToggle().toggleClass('js-picking');
	} else {
		autoFit.fadeToggle().toggleClass('js-picking');
	}

}).trigger('change');

/* выбор региона */
/*========================*/
var regionInput = $('.b-challenge__region input');
var regionList 	= $('.b-challenge__region-list');

regionInput.keyup(function(event) {

	var searchText	= regionInput.val();

	if (event.keyCode != 40 && event.keyCode != 38 && event.keyCode != 13) {
		
		if (searchText.length >= 2) {

			searchText = searchText[0].toUpperCase() + searchText.slice(1);

			regionList.addClass('js-opened');
			var numberSerch = 0;

			$('.b-challenge__region-list li span').each(function(index, el) {

				var item 		= $(this).closest('.b-challenge__region-list li');
				var itemName 	= $(this).text();

				item.removeClass('active');

				if (itemName.indexOf(searchText)>=0) {
					item.addClass('js-search');
					$(this).closest('.b-challenge__region-list li').fadeIn();
					item.data('number', numberSerch)
					numberSerch++;
				} else {
					item.removeClass('js-search');
					$(this).closest('.b-challenge__region-list li').fadeOut();
				}
			});
			

		} else if (searchText.length == 0 && $('.b-page-nav').length <= 0) {
			regionList.removeClass('js-opened');
		}
	} else {

		var searchList 				= $('.js-search');
		var searchListLength		= searchList.length;
		var searchListActive 		= $('.js-search.active');
		var searchListActiveIndex	= searchListActive.data('number')


		if (event.keyCode == 40) {
			if (!searchList.hasClass('active')) {
				searchList.eq(0).addClass('active').focus();
			} else {
				if (searchListActiveIndex < searchListLength-1) {
					searchListActive.removeClass('active').next('.js-search').addClass('active');
				}
			}
		} else if (event.keyCode == 38) {
			if (searchListActiveIndex > 0) {
				searchListActive.removeClass('active').prev('.js-search').addClass('active');
			}
		} else if (event.keyCode == 13) {
			regionList.removeClass('js-opened');
		}

		regionInput
			.val($('.js-search.active span').html())
			.data('region', $('.js-search.active').data('index'));
		
	}
});

$('.b-challenge__region-list li').on('click', function(event) {
	
	$('.js-search').removeClass('active');
	$(this).addClass('active');

	regionInput
		.val($('.js-search.active span').html())
		.data('region', $('.js-search.active').data('index'));

	regionList.removeClass('js-opened');

	hideErrorMessage(regionInput);	
});

/* потеря фокуса */
/*========================*/
regionInput.blur(function(event) {

	var formElement		= $(this);
	var formElementVal 	= formElement.val(); 
	var formElementError= true;

	if (formElementVal.length > 0) {
		$('.b-challenge__region-list li').each(function(index, el) {
			if ($(this).find('span').html() == formElementVal) {
				formElementError = false;
				regionInput.data('region', $(this).data('index'));
			}
		});
		if (formElementError) {
			showErrorMessage(formElement, 'Выберите регион из списка');
		} else {
			hideErrorMessage(formElement);
		}
	}
});

/* клик вне блока выбора региона */
/*========================*/
$(document).click( function(event){
	if( $(event.target).closest(".b-challenge__region").length ) {
		return;
	}
	regionList.removeClass('js-opened');
	event.stopPropagation();
});

/* добавление группы */
/*========================*/
$('.b-challenge__group-add a').on('click', function(event) {
	event.preventDefault();
	addingGroup ();
});

/* удаление группы */
/*========================*/
$(document).on('click', '.b-challenge__group-delete', function(event) {
	event.preventDefault();
	$(this).closest('.b-challenge__group').remove();
	if ($('.b-challenge__group-delete').length < 2) {
		$('.b-challenge__group-delete').removeClass('js-show');
	}
	groupLength();
	wordLength();
});

/* Добавить свой текст */
/*========================*/
$(document).on('change', '.b-challenge__group-add-text [type="radio"]', function(event) {
	$(this).closest('.b-challenge__group-add-text').find('.js-text-add').slideToggle();
});

/* текстовый редактор */
/*========================*/
tinymce.init({
	selector: '.b-challenge-popup textarea#text-added',
	height: 300,
	menubar: false,
	plugins: [
	'advlist autolink lists link image charmap print preview anchor textcolor',
	'searchreplace visualblocks code fullscreen',
	'insertdatetime media table contextmenu paste code help wordcount'
	],
	toolbar: 'insert | undo redo |  formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
	content_css: [
	'//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
	'//www.tinymce.com/css/codepen.min.css'],
	setup : function(ed){
	    ed.on('keyup', function(e){
    		var textRedactor = $('.mce-tinymce'); 
	    	if (textRedactor.hasClass('error')) {
				hideErrorMessage(textRedactor);
	    	}
	    });
	}
});

// открытие редактора
var groupTextAddPosition = 0;

$(document).on('click', '.b-challenge__text-add-button', function(event) {
	event.preventDefault();
	openForm($(this),'','',true);
});

// удаление добавленного текста 
$(document).on('click', '.b-his__delete', function(event) {
    event.preventDefault();

    var hisBlock = $(this).closest('.b-his');
    
    hisBlock.prev('.hide').removeClass('hide');
    hisBlock.remove();
});

// открытие созданного проекта 
$(document).on('click', '.b-his__title', function(event) {
    event.preventDefault();
    
    var itemTitle   = $(this).html();
    var itemContent = $(this).closest('.b-his').find('.b-his__content').html();

    openForm($(this), itemTitle, itemContent, true);
});

// закрытие формы
$('.b-challenge-popup__close, .b-challenge-popup__cancel').on('click', function(event) {
	event.preventDefault();
	closeEditor();
});

/* пакетное добавление */
/*========================*/
$('.b-challenge__batch-upload').on('click', function(event) {
	event.preventDefault();
	openForm($(this),'','');
});

// табуляция  
$("textarea").keydown(function(event){
	// не кропка tab - выходим
	if( event.keyCode !== 9 ) {
		return;
	}

	event.preventDefault();

	// Opera, FireFox, Chrome
	var textarea = $(this)[0],
		selStart = textarea.selectionStart,
		selEnd   = textarea.selectionEnd,
		slection = textarea.value.substring( selStart, selEnd ),
		slection_new = '',
		before   = textarea.value.substring( 0, selStart ),
		after    = textarea.value.substring( selEnd, textarea.value.length );

	// добавляем tab
	if( ! event.shiftKey ){
		selStart++;
		if( slection.trim() ) {
			slection_new = slection.replace(/^/gm, function(){ selEnd++; return "\t"; });
		}
		else {
			slection_new = "\t";
			selEnd++;
		}
	}
	// убриаем табы
	else {
		// если символ до выделения тоже \t удаляем и его
		if( before[ before.length -1 ] === "\t" ){
			before = before.substring( 0, before.length - 1 );
			selStart--;
			selEnd--;
		}

		slection_new = slection.replace(/^\t/gm, function(){ selEnd--; return ""; });
	}

	textarea.value = before + slection_new + after;

	// курсор
	textarea.setSelectionRange( selStart, selEnd );
});
/* поиск тематических слов */
$('#b-checkSum2').on('change', function(event) {
	challengeCalculation();
});
/*========================*/
/* Функциональная часть */
/*========================*/

// новая группа
var groupCounter 	= 0;
var newGroup 		= '<div class="b-challenge__group new-group"><a href="#" class="b-challenge__group-delete"><img src="images/icon/back_red.svg" alt="delete"></a><div class="b-challenge__group-list"><textarea name="group-list" cols="30" rows="10" placeholder="Список запросов"></textarea></div><div class="b-challenge__group-add-text"><div class="b-challenge__group-item"><div class="b-challenge__group-item-title">Добавить свой текст</div><div class="b-main-radios"><div class="b-main-radios__item"><input type="radio" name="selection" id="radio3" checked=""><label for="radio3">по URL</label></div><div class="b-main-radios__item"><input type="radio" name="selection" id="radio4"><label for="radio4">через форму</label></div></div><input type="text" name="add-url" placeholder="http://" class="js-text-add"><div class="b-challenge__text-add js-text-add"><a href="#add-text" class="b-challenge__text-add-button">Добавить текст</a></div></div><div class="b-challenge__group-item b-challenge__group-item--pages js-auto-fit"><textarea name="group-pages" cols="30" rows="7" placeholder="Страницы конкурентов"></textarea></div></div></div>';

function addingGroup (line) {

	var challengeGroup 		= $(newGroup);
	var challengeGroupRadio	= challengeGroup.find('[type="radio"]');
	var groupListText		= '';
	var addurlText			= '';
	groupCounter++;

	// делаем поля уникальными
	challengeGroupRadio.attr('name', challengeGroupRadio.attr('name') + groupCounter);
	challengeGroupRadio.each(function(index, el) {
		$(this).attr('id', $(this).attr('id') + groupCounter);
		$(this).next('label').attr('for', $(this).next('label').attr('for') + groupCounter);
	});

	// пакетное добавление
	if (line) {
		line.split('\t').forEach(function (field, index) {
		    if (index == 0) {
		        groupListText = field;
		    } else { 
		        addurlText = field;
		    }
		});
		challengeGroup
			.find('[name="group-list"]')
				.val(groupListText)
			.end()
			.find('[name="add-url"]')
				.val(addurlText);

		// сортируем по группам
		$('[name="add-url"]').each(function(index, el) {
			if ($(this).val() == addurlText) {
				challengeGroup = '';
				var neededList = $(this).closest('.b-challenge__group').find('[name="group-list"]');
				neededList.val(neededList.val()+'\n'+groupListText);
			}
		});

	}
	// вставка группы
	$('.b-challenge__group-add').before(challengeGroup);

	// проверка подбора конкурентов
	if ($('[name="picking"]:checked').attr('id') == 'radio2') {
		$('.new-group').find('.js-auto-fit').fadeIn().addClass('js-picking');
	}
	// показываем кнопку удалить
	if ($('.b-challenge__group').length > 1) {
        $('.b-challenge__group-delete').addClass('js-show');
    }
    // подсчитываем кол-во групп
	groupLength();
    // удаляем класс новой группы
	$('.new-group').removeClass('new-group');

};


// region json 
if ($('.b-challenge__region-list').length) {

	// проверяем есть ли в localStorage json
	if (localStorage.getItem('regionList')) {

		// если есть json, данные берем из него
		var regionJson = JSON.parse(localStorage.getItem("regionList")) 
		regionJson.forEach(function(item) {
		  $('.b-challenge__region-list').append('<li data-region="'+item.region+'" data-index="'+item.index+'"><span>'+item.city+'</span></li>')
		});

	} else {

		// если jsona нет, делаем ajax запрос 
		$.getJSON('regionList.json', function (regionList) {

			var regionList = JSON.stringify(regionList); 
			localStorage.setItem("regionList", regionList);
			regionList.forEach(function(item) {
			  $('.b-challenge__region-list').append('<li data-region="'+item.region+'" data-index="'+item.index+'"><span>'+item.city+'</span></li>')
			});

		});
	}
}
