/* ----------------------------------------------------------------------*/
// settings2 summ function

var yaInput             = '#b-check15';
var input               = $('.b-user-counts__input input');
var goInput             = '#b-check17';
var inputPriceindexing  = $(input).data('priceindexing');
var inputListPrice      = $(input).data('listprice');
var inputMinimalPrice	= $(input).data('minimalprice');
var inputLimitPage		= $(input).data('limitpage');
var formButton			= $('.b-user-counts__btn-start');

var changeTotalSum = function changeTotalSum() {

	var inputValue 	= parseInt($(input).val());
	var inputPrice 	= inputValue * inputListPrice;
	var checkPrice 	= inputValue * inputPriceindexing;
	var userBalance = parseInt($('.users-tariff-balance').html().replace(' ',''));

	if (isNaN(inputPrice)) {
		inputPrice = 0;
	}
	if (isNaN(checkPrice)) {
		checkPrice = 0;
	}

	if (inputValue > inputLimitPage) {
		

		var totalSum = inputPrice;
		var yaChecked = $(yaInput).is(':checked');
		var goChecked = $(goInput).is(':checked');

		if (goChecked && yaChecked) {
			totalSum = inputPrice + checkPrice * 2;
		} else if (goChecked || yaChecked) {
			totalSum = inputPrice + checkPrice;
		} else {
			totalSum = inputPrice;
		}

		if (totalSum < inputMinimalPrice) {
			totalSum = inputMinimalPrice
		}

	} else {
		var totalSum = 0;
	}

	inputPrice 	= inputPrice.toFixed(2);
	totalSum 	= totalSum.toFixed(2);
	checkPrice 	= checkPrice.toFixed(2);

	if (totalSum > userBalance) {

		var lacksLimits = totalSum-userBalance;
		lacksLimits = Math.ceil(lacksLimits);

		$('.few-limits').slideDown();
		formButton.addClass('disabled');
		$('.limits-amount').html(lacksLimits);

	} else if ($(input).val() == 0) {
		$('.few-limits').slideUp();
		formButton.addClass('disabled');
		
	} else {

		$('.few-limits').slideUp();
		formButton.removeClass('disabled');
		
	}

	var span1 = $('.b-user-counts__number .b-numb');
	$(span1).text(inputPrice);
	var span2 = $('.b-user-counts__total-item .b-numb');
	$(span2).text(totalSum);
	var span3 = $('.b-user-counts__checkbox-number .b-numb');
	$(span3).text(checkPrice);
};

$(yaInput+','+goInput).change(function () {
	changeTotalSum();
});
$(input).keyup(function () {
	changeTotalSum();
});

/* main checkbox */
$('.b-main-checkbox.disabled').find('input').attr('disabled', true);
