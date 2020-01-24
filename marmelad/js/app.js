/**
 * Подключение JS файлов которые начинаются с подчеркивания
 */
//=require ../_blocks/**/_*.js


/* ^^^
 * JQUERY Actions
 * ========================================================================== */
$(function() {

    'use strict';

    /**
     * определение существования элемента на странице
     */
    $.exists = (selector) => $(selector).length > 0;

    /*
		скрипты сайта
    */


  // svgs sprites working everywhere now
  /*
  * https://github.com/jonathantneal/svg4everybody
  */
  // svg4everybody()

  var owlTable2 = $('.js-owl-sync2');
  var owlTable1 = $('.js-owl-sync1');
  owlTable1.owlCarousel({
    items: 1,
    nav: true,
    navText: '',
    loop: false,
    autoplay: false,
    linked: '.js-owl-sync2'
  });
  owlTable2.owlCarousel({
    items: 1,
    nav: true,
    navText: '',
    loop: false,
    autoplay: false,
    linked: '.js-owl-sync1'
  });
  /* https://select2.org/ */

  function priceState(state) {
    if (!state.id) {
      return state.text;
    }
    var $state = $('\n    <div class="' + state.element.dataset.name.toLowerCase() + '">\n      <span>' + state.text + '</span>\n      <span>' + state.element.dataset.discount + '</span>\n    </div>\n    ');
    return $state;
  }
  $('.b-prices-content__select select').select2({

    templateSelection: priceState,
    templateResult: priceState,
    minimumResultsForSearch: -1
  });
  function priceState2(state) {
    if (!state.id) {
      return state.text;
    }
    var $state = $('\n    <div class="' + state.element.dataset.name.toLowerCase() + '">\n      <span>' + state.text + '</span>\n      <span>' + state.element.dataset.discount + '</span>\n    </div>\n    ');
    return $state;
  }
  $('.b-prices-table__select select').select2({

    templateSelection: priceState2,
    templateResult: priceState2,
    minimumResultsForSearch: -1
  });

  function formatState(state) {
    if (!state.id) {
      return state.text;
    }
    var $state = $('\n    <div class="' + state.element.value.toLowerCase() + '">\n    <span>\n    <img src="./img/payment/' + state.element.value.toLowerCase() + '.svg" />\n    </span>\n    <span> ' + state.text + '</span>\n    </div>\n    ');
    return $state;
  }
  $('.b-main-select2 select').select2({

    templateSelection: formatState,
    templateResult: formatState,
    minimumResultsForSearch: -1
  });
  $('.b-main-select2 select').on('select2:open', function () {
    $('.select2-results__options').niceScroll({
      mousescrollstep: 10,
      cursorcolor: '#A2AEB7',
      railpadding: { top: 13, right: 5, left: 0, bottom: 13 }
    });
  });
  $('.b-main-select select').select2({
    minimumResultsForSearch: -1
  });
  function dataSubscribe(state) {
    if (!state.id) {
      return state.text;
    }
    var $state = $('\n    <div class="' + state.element.dataset.name.toLowerCase() + '">\n    <span> ' + state.text + '</span>\n    <span>' + state.element.dataset.offer + '</span>\n    </div>\n    ');
    // <span>${state.element.dataset.count}</span>
    // <span>${state.element.dataset.currency}</span>
    return $state;
  }
  $('.b-main-select3 select').select2({
    templateSelection: dataSubscribe,
    templateResult: dataSubscribe,
    minimumResultsForSearch: -1
  });
  function dataTarif(state) {
    if (!state.id) {
      return state.text;
    }
    var $state = $('\n    <div>\n      <span>' + state.element.dataset.default + '</span>\n      <span> ' + state.element.value + '</span>\n    </div>\n    ');
    return $state;
  }
  $('.b-main-select4 select').select2({
    templateSelection: dataTarif,
    templateResult: dataTarif,
    minimumResultsForSearch: -1
  });
  /*
  * scroll inside selects2 https://github.com/inuyaksa/jquery.nicescroll
  */
  $('.b-main-select select').on('select2:open', function () {
    $('.select2-results__options').niceScroll({
      mousescrollstep: 10,
      cursorcolor: '#A2AEB7',
      railpadding: { top: 13, right: 5, left: 0, bottom: 13 }
    });
    if ($(this).data('class')) {
      $('.select2-results__options').addClass($(this).data('class'));
    }
  });

  $('.js-magnific a').magnificPopup({
    removalDelay: 350,
    mainClass: 'mfp-fade'
  });
  $(document).on('click', '.b-delete-account__cansel-btn', function () {
    $.magnificPopup.close();
  });

  /* ------------------------ user scripts ------------------------ */


  /*$(document).on('click', '.b-user__name-ico', function () {
    $('.hamburger').addClass('is-active');
  });*/
  /* profile btn change text */
  $(document).on('click', '.b-personal-data__btn span', function () {
    var text = $(this).text();
    var insideText = 'Добавить реквизиты фирмы';
    var otherText = 'Скрыть реквизиты фирмы';
    if (text === insideText) {
      $(this).text(otherText);
    } else {
      $(this).text(insideText);
    }
  });
  $(window).scroll(function () {
    var threshold = 244; // to show menu after this height(px)
    if ($(window).scrollTop() >= threshold) {
      $('.js-fixed').addClass('fixed');
    } else {
      $('.js-fixed').removeClass('fixed');
    }
    var check = $('#content').height() - $('.js-fixed').height() - 21;
    if ($(window).scrollTop() >= check) {
      $('.js-fixed').addClass('bottom');
    } else {
      $('.js-fixed').removeClass('bottom');
    }
  });
  // prices menu hover
  var menuLine1 = $('.b-prices-tariffs .line1');
  var menuLine2 = $('.b-prices-tariffs .line2');
  var menuLine3 = $('.b-prices-tariffs .line3');
  var menuLine4 = $('.b-prices-tariffs .line4');
  var menuLine5 = $('.b-prices-tariffs .line5');
  var menuLine6 = $('.b-prices-tariffs .line6');
  var menuLine7 = $('.b-prices-tariffs .line7');
  var menuLine8 = $('.b-prices-tariffs .line8');
  var menuLine9 = $('.b-prices-tariffs .line9');
  var menuLine10 = $('.b-prices-tariffs .line10');
  var menuLine11 = $('.b-prices-tariffs .line11');
  var menuLine12 = $('.b-prices-tariffs .line12');
  var menuLine13 = $('.b-prices-tariffs .line13');
  var menuLine14 = $('.b-prices-tariffs .line14');
  var menuItemArray = [menuLine1, menuLine2, menuLine3, menuLine4, menuLine5, menuLine6, menuLine7, menuLine8, menuLine9, menuLine10, menuLine11, menuLine12, menuLine13, menuLine14];

  menuItemArray.map(function (item) {
    $(item).hover(function () {
      $(item).addClass('active');
    }, function () {
      $(item).removeClass('active');
    });
  });
  $('.b-analysis__site-name-wrap').hover(function () {
    $('.b-analysis-name').css('display', 'block');
    $('.b-analysis-name__body').niceScroll({
      mousescrollstep: 10,
      cursorcolor: '#A2AEB7',
      railpadding: { top: 5, right: 0, left: 0, bottom: 5 }
    });
  }, function () {
    $('.b-analysis-name').css('display', 'none');
  });

  $('.b-analysis__time-date').hover(function () {
    $('.b-analysis__select-wrap').css('display', 'block');
    $('.b-analysis__select_date').niceScroll({
      mousescrollstep: 10,
      cursorcolor: '#A2AEB7',
      railpadding: { top: 5, right: 5, left: 0, bottom: 5 }
    });
  }, function () {
    $('.b-analysis__select-wrap').css('display', 'none');
  });
  $('.b-analysis-total__topic-date-wrap').hover(function () {
    $('.b-analysis-total__topic-date-body').css('display', 'block');
    $('.b-analysis__select_compare').niceScroll({
      mousescrollstep: 10,
      cursorcolor: '#A2AEB7',
      railpadding: { top: 5, right: 5, left: 0, bottom: 5 }
    });
  }, function () {
    $('.b-analysis-total__topic-date-body').css('display', 'none');
  });
  $('.b-analysis__options-wrap').hover(function () {
    $('.b-analysis__options-wrap').addClass('active');
    $('.b-analysis__options-body-wrapp').css('display', 'block');
  }, function () {
    $('.b-analysis__options-wrap').removeClass('active');
    $('.b-analysis__options-body-wrapp').css('display', 'none');
  });

  // switch the date
  $(document).on('click', '.js-date-switcher', function (e) {
    var targetInner = $(this).data('targetinner');
    var context = $(this).data('context');
    var tablinks = $(context).find('.js-date-switcher');
    var hideOnClick = $(this).data('hidetarget');
    if (hideOnClick) {
      $(hideOnClick).css('display', 'none');
    }

    tablinks.map(function (i) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    });
    e.currentTarget.className += ' active';
    if ($(this).hasClass('active')) {
      $(targetInner).html($(this).children().clone());
    }
  });
  // list of numbs
  $('.b-rewrite__list_number span').each(function (index) {
    $(this).text(index + 1 + '.');
  });





  /* change total based on tariff */
  $('.b-user-balance__select_tarif select').change(function () {
    var target = $(this).children('option').filter(':selected');
    var Discount = $('.b-user-balance__select_price select').children('option').filter(':selected');
    var changedDiv = $('.b-user-balance__total-count .b-numb');
    var currentTariffMoney = $(target).data('count');
    var currentDiscount = Math.abs(parseInt($(Discount).data('offer')));
    var months = $(Discount).data('months');
    if (isNaN(currentDiscount)) {
      currentDiscount = 0;
    }
    if ($(target).data('name') === 'b-offer1' || 'b-offer2' || 'b-offer3' || 'b-offer0') {
      $(changedDiv).text(currentTariffMoney * (1 - currentDiscount / 100) * months);
    }
  });
  /* make a discount for a current tariff */
  $('.b-user-balance__select_price select').change(function () {
    var target = $(this).children('option').filter(':selected');
    var changedDiv = $('.b-user-balance__total-count .b-numb');
    var currentTariff = $('.b-user-balance__select_tarif select').children('option').filter(':selected');
    var currentTariffMoney = $(currentTariff).data('count');
    var discount = Math.abs(parseInt($(target).data('offer')));
    var months = $(target).data('months');
    if (isNaN(discount)) {
      discount = 0;
    }
    if ($(target).data('name') === 'b-offer0' || 'b-offer1' || 'b-offer2' || 'b-offer3') {
      $(changedDiv).text(currentTariffMoney * (1 - discount / 100) * months);
    }
  });
  /* new btn if non-cash selected */
  $('.b-user-balance__select_payment select').change(function () {
    var target = $(this).children('option').filter(':selected');
    var oldButton = $('.b-user-balance__money-push_pay');
    var newButton = $('.b-user-balance__money-push_docs');
    var docLink = $('.b-user-balance__form-docs-link');

    if ($(target).data('name') === 'nomoney') {
      $(oldButton).css('display', 'none');
      $(newButton).css('display', 'block');
      $(docLink).css('display', 'block');
    } else {
      $(oldButton).css('display', 'block');
      $(newButton).css('display', 'none');
      $(docLink).css('display', 'none');
      $('.answer-block').remove();
    }
  });

  $(document).on('click', '.b-user-balance__input-topic', function () {
    $('.b-user-balance__money-input .b-promo-input').slideToggle();
  });

  $(document).on('click', '.b-user-balance__promo-code-text span', function () {
    $('.b-promo-input_promo').slideToggle();
  });

  // delete this one later
  $('.b-user-balance__money-input .b-promo-input').submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: 'https://data-ynsequqtzt.now.sh/statusOk.json',
      success: function success(res) {
        res.map(function (en) {
          var status = en.status;
          var text = en.text;
          if (status === 'error') {
            $('.b-promo-input__warning').text(text).fadeIn();
          } else if (status === 'ok') {
            $('.promo-ok__text').text(text);
            $.magnificPopup.open({
              items: {
                src: '#promo-ok'
              },
              type: 'inline',
              removalDelay: 300,
              mainClass: 'mfp-fade'
            });
          }
        });
      }
    });
  });
  $('.b-promo-input_promo').submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: 'https://data-ynsequqtzt.now.sh/statusError.json',
      success: function success(res) {
        res.map(function (en) {
          var status = en.status;
          var text = en.text;
          if (status === 'error') {
            $('.b-promo-input__warning').text(text).fadeIn();
          } else if (status === 'ok') {
            $('.promo-ok__text').text(text);
            $.magnificPopup.open({
              items: {
                src: '#promo-ok'
              },
              type: 'inline',
              removalDelay: 300,
              mainClass: 'mfp-fade'
            });
          }
        });
      }
    });
  });

  /* ajax requests */
  $('.b-user-filters__select_month select').change(function () {
    var target = $(this).children('option').filter(':selected');
    var currentListItem = $(target).data('list');
    $.ajax({
      url: 'https://data-ynsequqtzt.now.sh/data.json',
      success: function success(res) {
        var arr = res.map(function (e, index) {
          var date = e.date;
          var time = e.time;
          var type = e.type;
          var money = e.count;
          var tariff = e.tariff;
          var text = e.text;
          var divs = '\n          <div class="b-user-table__item" ' + index + '>\n              <div class="b-user-table__item-time"><span class="b-date">' + date + '</span><span class="b-time">' + time + '</span></div>\n              <div class="b-user-table__item-operation">' + type + '</div>\n              <div class="b-user-table__item-money minus">\n                <div class="b-user-table__span-wrapper"><span>' + money + '</span><span><i class="fa fa-rub" aria-hidden="true"></i></span></div>\n              </div>\n              <div class="b-user-table__item-rate">\n                <div class="b-user-table__item-rate-wrapper">' + tariff + '</div>\n              </div>\n              <div class="b-user-table__item-text"><span>' + text + '</span></div>\n            </div>\n          ';
          if (index < 2 && currentListItem === 'item1') {
            return divs;
          }
        });
        $('.b-user-table__content').html(arr);
      }
    } // success
    );
  });


  /* settings2 radios changing */
  $('.b-main-hastextarea input').change(function () {

    var itemTextarea = $(this).closest('.b-main-hastextarea').find('.b-main-textarea');
    if ($(this).is(':checked')) {
      itemTextarea.fadeIn();
    } else {
      itemTextarea.fadeOut();
    }
  });

  $('#radio1, #radio2').change(function() {
    $('.b-user-robotx__radios .b-main-textarea').fadeOut();
  });

  /* ----------------------------------------------------------------------*/

  /* form settings 01 stuff */
  $(document).on('click', '.b-user-balance__status-btn a', function () {
    var text = $(this).text();
    var insideText = 'Приобрести подписку';
    var otherText = 'Отмена';
    if (text === insideText) {
      $(this).text(otherText);
    } else {
      $(this).text(insideText);
    }
  });
  $(document).on('click', '.b-user-balance__notify-btn a', function (e) {
    e.preventDefault();

    var id = $(this).attr('href');
    var top = $(id).offset().top;
    if ($(window).width() < 768) {
      $('body,html').animate({ scrollTop: top }, 1500, function () {
        $('.b-user-balance__money-content').slideDown();
        $('.b-user-balance__btn-wrapper').fadeOut();
      });
    } else {
      $('.b-user-balance__money-content').slideDown();
      $('.b-user-balance__btn-wrapper').fadeOut();
    }
  });
  $(document).on('click', '.b-user-balance__money-btn a', function (e) {
    e.preventDefault();
    $('.b-user-balance__money-content').slideDown();
    $('.b-user-balance__btn-wrapper').fadeOut();
    $('.b-promo-input').fadeOut();
    $('.b-promo-input__warning').fadeOut();
    // $('.b-user-balance__promo-code-text').css('display', 'none')
  });


  $(document).click(function (e) {
    if ($(e.target).closest('.b-projects-table__options').length === 0) {
      $('.b-projects-table__options-body').fadeOut('fast');
      $('.b-projects-table__options').removeClass('activate');
    }
  });

  /* input file preview */
  $('#file-1').change(function () {
    var preview = document.querySelector('.b-prev-img');
    var file = document.querySelector('.inputfile-1').files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      preview.src = reader.result;
    };

    if (file) {
      $('.b-prev-img').fadeIn();
      $('.js-inputfile label').addClass('active');
      reader.readAsDataURL(file);
    } else {
      $('.b-prev-img').css('display', 'none');
      $('.js-inputfile label').removeClass('active');
      preview.src = '';
    }
  });

  // report menu
  $(document).on('click', '.js-report-menu', function () {
    var $this = $(this);
    var context = $this.data('slidecontext');
    var selector = $this.data('slidetoggle');
    var $target = selector ? context ? $(selector, $this.closest(context)) : $(selector) : $this.closest(context);

    // const isActive = $target.hasClass('active')
    $this.toggleClass('active');
    $target.toggleClass('border');

    $target.show().animate({
      left: $target.hasClass('active') ? '-250' : '0', // the target class has to me 'left: -100%;'
      width: $target.hasClass('active') ? '0' : '250',
      marginRight: $target.hasClass('active') ? '19' : '0'

    }, 350, false, function () {
      $target.toggleClass('active');
      // $target.toggle(!isActive)
    });
  });

  // simple toggle script
  $(document).on('click', '.js-slide-toggle', function (e) {
    e.preventDefault();

    var $this = $(this);
    var trigger = $this.data('slidetrigger');
    var selector = $this.data('slidetoggle') || '.js-slide-toggle-content';
    var context = $this.data('slidecontext');
    var mode = $this.data('slidemode');
    var thisonetoggle = $this.data('thisclass');
    var toggleclass = $this.data('slideclasstoggle');
    var effect = $this.data('slideeffect');
    var bodycover = $this.data('bodycover');
    var bodyfix = $this.data('bodyfix');
    var $target = selector ? context ? $(selector, $this.closest(context)) : $(selector) : $this.closest(context);

    if (mode) {
      if (mode === 'desktop' && global.mobile || mode === 'mobile' && !global.mobile) {
        return;
      }
    }
    if (thisonetoggle) {
      $(this).toggleClass('activate');
    }

    if (trigger) {
      $('.js-slide-toggle[data-slidetoggle=', ' + trigger + ', ']').click();
      return;
    }

    if (effect === 'fade') {
      $target.each(function () {
        if ($(this).is(':visible')) {
          $(this).fadeOut(250);
        } else {
          $(this).addClass('animate');
          $(this).fadeIn(250, function () {
            $target.removeClass('animate');
            $(window).trigger('scroll');
            $(window).trigger('resize');
          });
        }
      });
    } else if (effect === 'slideleft') {
      var isActive = $target.hasClass('active');
      var $parent = $target.parent();
      var $findBody = $target.parents('body'); // find body from the target element - back to top.

      $parent.addClass('b-overflow');
      $target.show().animate({
        left: $target.hasClass('active') ? '-100%' : '0' // the target class has to me 'left: -100%;'
      }, 350, false, function () {
        $(window).trigger('scroll');
        $(window).trigger('resize');
        $parent.removeClass('b-overflow').end().toggleClass('active');
        $target.closest(toggleclass).toggleClass('activate');
        $target.closest(bodyfix).parents('body').toggleClass('bodyfixed'); // toggle body
        $findBody.find(bodycover).toggleClass('js-cover-content'); // toggleClass for cover(content) [has to be css rules at 'cover-content']

        $target.toggle(!isActive);
      });
    } else if (effect === 'slideright') {
      var _isActive = $target.hasClass('active');
      var _$parent = $target.parent();
      var _$findBody = $target.parents('body'); // find body from the target element - back to top.

      _$parent.addClass('b-overflow');
      $target.show().animate({
        right: $target.hasClass('active') ? '-100%' : '0' // the target class has to me 'right: -100%;'
      }, 350, false, function () {
        $(window).trigger('scroll');
        $(window).trigger('resize');
        _$parent.removeClass('b-overflow').end().toggleClass('active');
        $target.closest(toggleclass).toggleClass('activate');
        $target.closest(bodyfix).parents('body').toggleClass('bodyfixed'); // toggle body
        _$findBody.find(bodycover).toggleClass('js-cover-content'); // toggleClass for cover(content) [has to be css rules at 'cover-content']

        $target.toggle(!_isActive);
      });
    } else {
      var _$findBody2 = $target.parents('body');

      $target.addClass('animate');
      $target.closest(bodyfix).parents('body').toggleClass('bodyfixed'); // toggle body
      _$findBody2.find(bodycover).toggleClass('js-cover-content');
      $target.closest(toggleclass).toggleClass('activate');
      $target.slideToggle(300, function () {
        $target.removeClass('animate');
        $(window).trigger('scroll');
        $(window).trigger('resize');
      });
    }
    if ($this.data('slidehide')) {
      $this.toggle();
    }
  });

  function createCookie(name,value,days)
  {
    if (days)
    {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+encodeURIComponent(value)+expires+"; path=/";
  }

  function readCookie(name)
  {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++)
    {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  function eraseCookie(name)
  {
    createCookie(name,"",-1);
  }


  /*========================*/

  // открытие формы
  function openForm (button, title, content, position) {

    var openButton    = button;
    var formId      = openButton.attr('href',);
    var fieldsTitle   = title ||'';
    var fieldsContent   = content || '';

    $('.b-challenge-popup').addClass('js-opened');
    $('html, body').scrollTop(0);

    $(formId).slideDown();

    if (position) {
      groupTextAddPosition = openButton.closest('.b-challenge__group').offset().top;
    } else {
      if ($('.b-challenge__group').length) {
        groupTextAddPosition = $('.b-challenge__group').eq(0).offset().top;
      } else {
        groupTextAddPosition = $('.b-site-content').eq(0).offset().top;
      }
    }

    $('[name="batch-upload"]').val('');
    $('[name="add-text-title"]').val(fieldsTitle);
    tinyMCE.activeEditor.setContent(fieldsContent);

    if (openButton.hasClass('b-his__title')) {
      openButton.closest('.b-challenge__group').find('.b-his').addClass('js-opened');
    } else {
      openButton.addClass('js-opened');
    }
  };

  // закрытие формы
  function closeEditor () {
    $('.b-challenge-popup').removeClass('js-opened');
    $("html, body").animate({scrollTop: groupTextAddPosition}, 1000)
    $('.b-challenge__text-add .js-opened').removeClass('js-opened');
    $('.b-challenge-popup__form').slideUp();
  };

  // подсчет групп
  function groupLength () {
    $('.b-challenge__group-amount').html($('.b-challenge__group').length);
    challengeCalculation ();
  };

  // подсчет ключевых слов
  function wordLength () {
    var wordLength = 0;
    $('[name="group-list"]').each(function(index, el) {
      $(this).val().split('\n').forEach(function (line, index){
        if (line.length > 1) {
          wordLength++
        }
      });
    });
    $('.b-challenge__word-amount').html(wordLength);
    challengeCalculation ();
  }
  function challengeCalculation () {
    var textAnalysis  = 0;
    var wordSearch    = 0;
    var allSumm     = 0;

    var userBalance   = parseInt($('.users-tariff-balance').html().replace(' ', ''));
    var wordAmount    = parseInt($('.b-challenge__word-amount').html());
    var groupAmount   = parseInt($('.b-challenge__group-amount').html());

    var groupValue    = 20;
    var wordValue   = 1;
    var searchWordValue = 1;

    textAnalysis = groupAmount * groupValue + wordAmount * wordValue;
    wordSearch   = wordAmount * searchWordValue;

    if ($('#b-checkSum2').is(':checked')) {
      allSumm = textAnalysis + wordSearch;
    } else {
      allSumm = textAnalysis;
    }

    $('.b-challenge__sum-item-price--amount').html(textAnalysis);
    $('.b-challenge__sum-item-price--word').html(wordSearch);
    $('.b-challenge__sum-item-price--all').html(allSumm);

    if (allSumm > userBalance) {

          var lacksLimits = allSumm - userBalance;
          lacksLimits = Math.ceil(lacksLimits);

          $('.few-limits').slideDown();
          $('.b-challenge__button').addClass('disabled');
          $('.limits-amount').html(lacksLimits);
        } else {

          $('.few-limits').slideUp();
          $('.b-challenge__button').removeClass('disabled');

        }

  }


    /**
     * [^_]*.js - выборка всех файлов, которые не начинаются с подчеркивания
     */
    //=require ../_blocks/**/[^_]*.jquery.js
});

function validationForm (form) {

    var isNotFilled = true;
    var groupPages  = false;

    form.find('input').each(function(index, el) {

        var formElement     = $(this);
        var elementName     = $(this).attr('name');
        var elementVal      = formElement.val();
        var newPassword     = formElement.closest('form').find('[name="newPassword"]').val();
        var emailPattern    = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        var urlPattern      = /.+?\..+/i;


        // авторизация
        if (elementName == "consent" && !formElement.is(':checked')) {
            isNotFilled = false;
            showErrorMessage(formElement, 'Поле обязательно для заполнения');
        }

        if (elementName == "name" && elementVal == "") {
            isNotFilled = false;
            showErrorMessage(formElement, 'Введите ваше имя');
        }

        if (elementName == "password" && elementVal == "") {
            isNotFilled = false;
            showErrorMessage(formElement, 'Введите пароль от учётной записи');
        }

        if ((elementName == "newPassword" && elementVal.length >= 1 && elementVal.length <= 5) || (elementName == "password" && elementVal.length >= 1 && elementVal.length <= 5)) {
            isNotFilled = false;
            showErrorMessage(formElement, 'Введите пароль не менее 6 символов');
        }

        if (elementName == "repeatPassword" && elementVal != newPassword) {
            isNotFilled = false;
            showErrorMessage(formElement, 'Пароли не совпадают, повторите ввод');
        }

        if (elementName == "email" && emailPattern.test(elementVal) == 0) {
            isNotFilled = false;
            showErrorMessage(formElement, 'Введите адрес электронной почты');
        }

        if (elementName == "url" && urlPattern.test(elementVal) == 0) {
            isNotFilled = false;
            showErrorMessage(formElement, 'Введите адрес сайта, например, https://sitereport.ru');
        }
        //==========


        if (elementName == "add-text-title" && elementVal == "") {
            isNotFilled = false;
            showErrorMessage(formElement, 'Заполните поле Title');
        }

        // создавние новой задачи
        if (elementName == "challenge-name" && elementVal == "") {
            isNotFilled = false;
            showErrorMessage(formElement, 'Введите название задачи');
        }
        if (elementName == 'picking' && formElement.attr('id') == 'radio2' && formElement.is(':checked')) {
            groupPages = true;
        }


    });

    form.find('textarea').each(function(index, el) {

        var formElement     = $(this);
        var elementName     = $(this).attr('name');
        var elementVal      = formElement.val();

        if (elementName == 'add-text' && tinyMCE.get('text-added').getContent() == "") {
            isNotFilled = false;
            formElement = formElement.prev('.mce-tinymce');
            showErrorMessage(formElement, 'Добавьте текст');
        }

        if (elementName == 'batch-upload' && elementVal == "") {
            isNotFilled = false;
            showErrorMessage(formElement, 'Добавьте ключевые слова');
        } else if (elementName == 'batch-upload') {
            $('[name="batch-upload"]').val().split('\n').forEach(function(el,i){
                if (/\t/.test(el)) {
                    el.split('\t').forEach(function(line, i) {
                        if ($.trim(line).length <= 1 && line != '') {
                            isNotFilled = false;
                        }
                    });
                } else if (el != "") {
                    console.log('tut');
                    isNotFilled = false;
                }
            })
            if (!isNotFilled) {
                showErrorMessage(formElement, 'Проверьте данные на соответствие шаблону');
            }

        }

        // создавние новой задачи
        if (elementName == "group-list" && elementVal == "") {
            isNotFilled = false;
            showErrorMessage(formElement, 'Добавьте ключевые слова');
        }
        if (groupPages && elementName == 'group-pages') {
            if (elementVal == "") {
                isNotFilled = false;
                showErrorMessage(formElement, 'Добавьте URL конкурентов');
            } else {
                elementVal.split('\n').forEach(function (line, index) {
                    if (~line.indexOf('https://') || ~line.indexOf('http://')) {

                    } else {
                        isNotFilled = false;
                        showErrorMessage(formElement, 'Добавьте URL конкурентов');
                    }

                });
            }
        }

    });

    return isNotFilled;
}


// Добавляет полю формы с ошибкой класс 'error' и сообщение об ошибке
// а также проверяет, если все поля заполнены верно - убирает класс и ошибку у кнопки формы
function showErrorMessage (element, errorMessage) {
    if (element.attr('type') == 'checkbox') {
        $(element).not('.error').addClass('error').next('label').after('<div class="error-text">'+ errorMessage +'</div>');
    } else {
        $(element).not('.error').addClass('error').after('<div class="error-text">'+ errorMessage +'</div>');
    }
};

// Удаляет класс 'error' и сообщение об ошибке
function hideErrorMessage (element) {

    if (element.attr('type') == 'checkbox') {
        element.removeClass('error').next('label').next(".error-text").remove();
    } else {
        element.removeClass('error').next(".error-text").remove();
    }

    var elementForm = element.closest('form');

    if (!elementForm.find('.error:not(button)').length) {
        elementForm.find('button').removeClass('error').next(".error-text").remove();
    }
};
$('.close-profile').on('click', function (ev) {
  ev.preventDefault();
  $('#navigation-profile').hide();
  $('body').removeClass('is-hidden');
});

$(document).on('mouseup', function (ev) {
  var $nav = $('#navigation');
  var $body = $('body');
  if (!$body.hasClass('menu-is-open')) {
    return void 0;
  }
  var $target = $(ev.target);
  var $hamburgers = $('.hamburger');
  if (!$nav.has($target).length && !$hamburgers.has($target).length ) {
    $body.removeClass('menu-is-open is-hidden');
    $body.css('margin-right', '');
    $nav.slideUp();
    $hamburgers.removeClass('is-active')
  }
});