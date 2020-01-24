$('.b-balance-tabs__button').on('click', function(event) {
	event.preventDefault();
	var itemId 		= $(this).attr('href');
	var buttonWrap 	= $(this).closest('.b-balance-tabs__buttons');

	buttonWrap.slideUp();
	$(itemId).slideDown();

});

$('.b-user-balance__cansel-btn').on('click', function(event) {
	event.preventDefault();
	$('.b-balance-tabs__item').slideUp();
	$('.b-balance-tabs__buttons').slideDown();
});

$('.b-user-balance__input_summ input').keyup(function () {
	var itemSumm = parseInt($(this).val()) || 0;
	$(this).closest('.b-balance-tabs__item').find('.b-user-balance__total-limit .b-numb').html(itemSumm);
});

$('.b-user-balance__money-push_docs').on('click', function(event) {
	event.preventDefault();
	
	var itemWrap	= $(this).closest('.b-balance-tabs__item');
	var buttonWrap	= $(this).closest('.b-user-balance__cansel-wrapper');
	if (!itemWrap.find('.answer-block').length) {
		buttonWrap.after('<div class="answer-block"></div>');
	}
	var answerBlock = $('.answer-block');

	answerBlock.html('<div class="block-preloader"><span></span><span></span><span></span></div>');
	itemWrap.addClass('js-blocking');

	setTimeout(function () {
		itemWrap.removeClass('js-blocking');
		answerBlock.html('');
		answerBlock.append('<div class="b-user-balance__notify b-user-balance__notify_up"><div class="b-user-balance__notify-text">Средства будут зачислены на баланс после оплаты по документам: <p><a class="uploading-document" href="#"><i class="far fa-file-pdf"></i>Договор</a><a class="uploading-document" href="#"><i class="far fa-file-pdf"></i>Счёт-фактура</a></p></div></div><div class="block-error">Ошибка отправки данных. <br />Попробуйте ещё раз.</div>')
	},3000);

});

$('.buy-limits').on('click', function(event) {

	var amountLimits = $('.limits-amount').html();
	createCookie('buyLimits', amountLimits);

});



/*===============================================*/

// GLOBALS
var $hash = window.location.hash;
var tariffUrlCount = $hash.match(/\d+/);
var tariffUrlString = $hash.match(/[a-zA-Z]+/g);


// rest of code
if ($hash === '#b-reqv') {
	$('.b-personal-data__btn span').text('Скрыть реквизиты фирмы');
	$('.b-personal-form__requisites').slideDown();
	var top = $($hash).offset().top;
	$('body,html').animate({ scrollTop: top }, 1500);
}

if (tariffUrlCount) {

	$('.b-user-balance__select_price select option').each(function(index, el) {
		$('.b-user-balance__select_price select').val(tariffUrlCount[0]).trigger('change');
	});
}

// settings01.html переход на другую страницу и смена данных на основе выбора пользователя

if (tariffUrlString) {

	var tariffObj = {
	  start: 'Старт',
	  standard: 'Стандарт',
	  optimal: 'Оптимальный',
	  premium: 'Премиум'
	};
	var mainTarrif = tariffUrlString;

	if (!mainTarrif) {} else {
	  mainTarrif = tariffUrlString[0];
	}
	var goToPage = function goToPage(tariff, obj) {
		var targetSelect = $('.b-user-balance__select_tarif select');
		var content = $('.b-user-balance__status-content');
		var content2 = $('.b-user-balance__money-content');

			console.log(tariff);
		if (tariff == 'buy') {
			var amountLimits = readCookie('buyLimits');
			if (amountLimits != null) {
			console.log(amountLimits);
				$('.b-user-balance__input_summ input').val(amountLimits).trigger('keyup')
			}
			$('[href="#'+tariff+'"]').trigger('click');
		} else if (tariff != 'off' && tariff != 'buy') {
			$(content).slideDown();
			$(targetSelect).val(obj[tariff]).trigger('change');
			$('.b-balance-tabs__button--subscription').trigger('click');
		}  
		var _top = $('.b-user-balance').offset().top;
		$('body,html').animate({ scrollTop: _top }, 1500);
	};
	goToPage(mainTarrif, tariffObj);

}
