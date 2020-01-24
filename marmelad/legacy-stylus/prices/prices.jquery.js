function priceMdCurSwitcher() {
  var context = $(this).parents('.b-prices-tariffs__item-container');
  var rowDiscount = $(context).find('.b-prices-table__select select').children('option').filter(':selected');
  var Discount = Math.abs(parseInt($(rowDiscount).data('discount')));
  var togglePriceActive = $('.b-prices-table__tariff-prices');
  var Months = Math.abs(parseInt($(rowDiscount).data('months')));

  var tariffStart = $(context).find('.tariff-start');
  var tariffStandard = $(context).find('.tariff-standard');
  var tariffOptimal = $(context).find('.tariff-optimal');
  var tariffPremium = $(context).find('.tariff-premium');
  var tariffOff = $(context).find('.b-prices-off');
  var tariffArray = [tariffStart, tariffStandard, tariffOptimal, tariffPremium, tariffOff];

  if (tariffStart) {
	var targetLink = $(tariffStart).find('.b-prices-table__buy-btn a');
	$(targetLink).attr('href', './settings01.html#start[' + Months + ']');
  }
  if (tariffStandard) {
	var _targetLink = $(tariffStandard).find('.b-prices-table__buy-btn a');
	$(_targetLink).attr('href', './settings01.html#standard[' + Months + ']');
  }
  if (tariffOptimal) {
	var _targetLink2 = $(tariffOptimal).find('.b-prices-table__buy-btn a');
	$(_targetLink2).attr('href', './settings01.html#optimal[' + Months + ']');
  }
  if (tariffPremium) {
	var _targetLink3 = $(tariffPremium).find('.b-prices-table__buy-btn a');
	$(_targetLink3).attr('href', './settings01.html#premium[' + Months + ']');
  }

  tariffArray.map(function (item) {
	var pricePerMonthOld = $(item).find('.b-prices-table__tariff-old-price .b-number').text();
	var pricePerMonthNew = $(item).find('.b-prices-table__tariff-new-price .b-number');
	var token = $(item).find('.b-prices-table__tariff-token-cost .token');
	var defaultTokenPrice = $(token).data('price');

	if (isNaN(Discount) || undefined) {
	  $(togglePriceActive).removeClass('active');
	  $(pricePerMonthNew).text(pricePerMonthOld);
	  $(token).text(defaultTokenPrice);
	} else if (item) {
	  $(togglePriceActive).addClass('active');
	  $(pricePerMonthNew).text(pricePerMonthOld - pricePerMonthOld * Discount / 100);
	  if (item.attr('class') != 'b-prices-off') {
		$(token).text(defaultTokenPrice - defaultTokenPrice * Discount / 100);
	  }
	}

	var tokenCheck = $(context).find('.check-token').is(':checked');
	var rubCheck = $(context).find('.check-rub').is(':checked');
	var changedItem1 = $(item).find('.js-curchange-md');
	var changedItem2 = $(item).find('.js-curchangepage-md');

	if (tokenCheck) {
	  $.each(changedItem1, function (index) {
		var changedItem01 = $(changedItem1[index]);
		$(changedItem01).find('.cur-change').text($(changedItem01).data('default'));
		$(changedItem01).removeClass('activeIcon');
	  });
	  $.each(changedItem2, function (index) {
		var changedItem02 = $(changedItem2[index]);
		$(changedItem02).find('.cur-change').text($(changedItem02).data('default'));
		$(changedItem02).removeClass('activeIcon');
	  });
	} else if (rubCheck) {
	  $.each(changedItem1, function (index) {
		var changedItem01 = $(changedItem1[index]);
		if (isNaN(Discount) || Discount === undefined) {
		  $(changedItem01).find('.cur-change').text($(changedItem01).data('default'));
		  $(changedItem01).addClass('activeIcon');
		} else {
		  $(changedItem01).addClass('activeIcon');
		  if (item.attr('class') != 'b-prices-off') {
			$(changedItem01).find('.cur-change').text(($(changedItem01).data('default') - $(changedItem01).data('default') * Discount / 100).toFixed(3));
		  }
		}
	  });
	  $.each(changedItem2, function (index) {
		var changedItem02 = $(changedItem2[index]);
		if (isNaN(Discount) || Discount === undefined) {
		  $(changedItem02).find('.cur-change').text($(changedItem02).data('default'));
		  $(changedItem02).addClass('activeIcon');
		} else {
		  $(changedItem02).addClass('activeIcon');
		  $(changedItem02).find('.cur-change').text(($(changedItem02).data('default') - $(changedItem02).data('default') * Discount / 100).toFixed(3));
		}
	  });
	}
  });
}
$('.b-prices-table .b-prices-table__select select').change(function () {
  priceMdCurSwitcher.call(this);
});
$('#b-check25').change(function () {
  priceMdCurSwitcher.call(this);
});
$('#b-check26').change(function () {
  priceMdCurSwitcher.call(this);
});


/*===========================================*/

  function priceCurSwitcher() {
    var currentOwlSlide = $(this).parents('.owl-item.active');
    var indexTarget = $('.b-prices-content__table-elems .owl-item.active');
    var index1 = $(currentOwlSlide).index();
    var index2 = $(indexTarget).index();
    var rowDiscount = $(currentOwlSlide).find('.b-prices-content__select select').children('option').filter(':selected');
    var Discount = Math.abs(parseInt($(rowDiscount).data('discount')));

    var changedItem1 = $(indexTarget).find('.js-curchange');
    var changedItem2 = $(indexTarget).find('.js-curchangepage');

    var tokenCheck = $(currentOwlSlide).find('.check-token').is(':checked');
    var rubCheck = $(currentOwlSlide).find('.check-rub').is(':checked');

    // const targetCurArray = [changedItem1, changedItem2]

    if (index1 === index2 && tokenCheck) {
      $.each(changedItem1, function (index) {
        var changedItem01 = $(changedItem1[index]);

        $(changedItem01).find('.cur-change').text($(changedItem01).data('default'));
        $(changedItem01).removeClass('active');
      });
      $.each(changedItem2, function (index) {
        var changedItem02 = $(changedItem2[index]);

        $(changedItem02).find('.cur-change').text($(changedItem02).data('default'));
        $(changedItem02).removeClass('active');
      });
      // targetCurArray.map((item) => {
      //   $(item).find('.cur-change').text($(item).data('default'))
      //   $(item).removeClass('active')
      // })
    } else if (index1 === index2 && rubCheck) {
      if (isNaN(Discount) || Discount === undefined) {
        $.each(changedItem1, function (index) {
          var changedItem01 = $(changedItem1[index]);

          $(changedItem01).find('.cur-change').text($(changedItem01).data('default'));
          $(changedItem01).addClass('active');
        });
        $.each(changedItem2, function (index) {
          var changedItem02 = $(changedItem2[index]);

          $(changedItem02).find('.cur-change').text($(changedItem02).data('default'));
          $(changedItem02).addClass('active');
        });
        // targetCurArray.map((item) => {
        //   $(item).addClass('active')
        //   $(item).find('.cur-change').text($(item).data('default'))
        // })
      } else {
        $.each(changedItem1, function (index) {
          var changedItem01 = $(changedItem1[index]);

          $(changedItem01).addClass('active');
          $(changedItem01).find('.cur-change').text(($(changedItem01).data('default') - $(changedItem01).data('default') * Discount / 100).toFixed(3));
        });
        $.each(changedItem2, function (index) {
          var changedItem02 = $(changedItem2[index]);

          $(changedItem02).addClass('active');
          $(changedItem02).find('.cur-change').text(($(changedItem02).data('default') - $(changedItem02).data('default') * Discount / 100).toFixed(3));
        });
        // targetCurArray.map((item) => {
        //   $(item).addClass('active')
        // })
        // $(changedItem1).find('.cur-change').text($(changedItem1).data('default') - ($(changedItem1).data('default') * Discount) / 100)
        // $(changedItem2).find('.cur-change').text(
        //   ($(changedItem2).data('default') - ($(changedItem2).data('default') * Discount) / 100).toFixed(3),
        // )
      }
    }
  }

  // change tariff prices.html
  $('.b-prices-content__select select').change(function () {
    var indexTarget = $('.b-prices-content__table-elems .owl-item.active');
    var currentOwlSlide = $(this).parents('.owl-item.active');
    var index1 = $(currentOwlSlide).index();
    var index2 = $(indexTarget).index();
    var oldPrice = $(indexTarget).find('.b-prices-content__old-price .b-number').text();
    var newPrice = $(indexTarget).find('.b-prices-content__current-price .b-number');
    var rowDiscount = $(this).children('option').filter(':selected');
    var Discount = Math.abs(parseInt($(rowDiscount).data('discount')));
    var toggleVisibility = $(indexTarget).find('.b-prices-content__current-price-wrap');
    var token = $(indexTarget).find('.b-prices-content__token-cost .token');
    var defaultTokenPrice = $(token).data('price');

    if (index1 === index2) {
      if (isNaN(Discount) || undefined) {
        $(toggleVisibility).removeClass('active');
        $(newPrice).text(oldPrice);
        $(token).text(defaultTokenPrice);
      } else {
        $(toggleVisibility).addClass('active');
        $(newPrice).text(oldPrice - oldPrice * Discount / 100);
        $(token).text(defaultTokenPrice - defaultTokenPrice * Discount / 100);
      }
    }

    var Months = Math.abs(parseInt($(rowDiscount).data('months')));
    var tariff = $(this).parents('.owl-item.active').find('.b-prices-content__tariff-topic').text();
    var targetLink = $('.js-authorized a');

    if (tariff === 'OFF') {
      $(targetLink).attr('href', './settings01.html#off[' + Months + ']');
    } else if (tariff === 'Старт') {
      $(targetLink).attr('href', './settings01.html#start[' + Months + ']');
    } else if (tariff === 'Стандарт') {
      $(targetLink).attr('href', './settings01.html#standard[' + Months + ']');
    } else if (tariff === 'Оптимальный') {
      $(targetLink).attr('href', './settings01.html#optimal[' + Months + ']');
    } else if (tariff === 'Премиум') {
      $(targetLink).attr('href', './settings01.html#premium[' + Months + ']');
    }

    priceCurSwitcher.call(this);
  });
  $('.check-token').change(function () {
    priceCurSwitcher.call(this);
  });
  $('.check-rub').change(function () {
    priceCurSwitcher.call(this);
  });

  owlTable1.on('changed.owl.carousel', function () {
    var tariff = $(this).find('.owl-item.active .b-prices-content__tariff-topic').text();
    var targetLink = $('.js-authorized a');
    var rowSelectedValue = $(this).find('.owl-item.active .b-prices-content__select select').children('option').filter(':selected');
    var selectedValue = Math.abs(parseInt($(rowSelectedValue).data('months')));

    if (tariff === 'OFF') {
      $(targetLink).attr('href', './settings01.html#off[' + selectedValue + ']');
    } else if (tariff === 'Старт') {
      $(targetLink).attr('href', './settings01.html#start[' + selectedValue + ']');
    } else if (tariff === 'Стандарт') {
      $(targetLink).attr('href', './settings01.html#standard[' + selectedValue + ']');
    } else if (tariff === 'Оптимальный') {
      $(targetLink).attr('href', './settings01.html#optimal[' + selectedValue + ']');
    } else if (tariff === 'Премиум') {
      $(targetLink).attr('href', './settings01.html#premium[' + selectedValue + ']');
    }
  });