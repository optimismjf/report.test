$('body').on('mouseover', '.l-menu-line, .l-menu', function(event) {
    $('.l-menu').addClass('slide-open');
});

$('body').on('mouseout', '.l-menu-line, .l-menu', function(event) {
    if ($('.l-menu__button').hasClass('slide-open')) {
        $('.l-menu').addClass('slide-open');
    } else {
        $('.l-menu').removeClass('slide-open');
    }
});

$('.l-menu__button').on('click', function(event) {
    event.preventDefault();
    $('.l-menu').toggleClass('slide-open');
    $('.l-menu__button').toggleClass('slide-open');
    if ($('.l-menu__button').hasClass('slide-open')) {
        $('.b-analysis-total').addClass('js-opened');
    } else {
        $('.b-analysis-total').removeClass('js-opened');
    }
});


var maxWidth = 300;    
$.each($('.l-menu__inner').find('li'), function(index, element) {


    if ($(element).find('ul').length) {
        var triggerIcon = ['<div class="svg-icon svg-icon--angle-down">',
                '<svg class="svg-icon__link" fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">',
                    '<path d="M7 10l5 5 5-5z"/> <path d="M0 0h24v24H0z" fill="none"/>',
                '</svg>',
            '</div>'].join('');

        var subMenuTrigger = $('<div class="sub-menu-trigger">' + triggerIcon + '</div>');

        $(element)
            .addClass('is-has-child')
            .append(subMenuTrigger);
    }

});


$.each($('.l-menu__list').find('li'), function(index, element) {
    if ($(element).find('ul').length) {
        $(element).addClass('is-has-child');
    }   
});

$('.l-menu__list > .is-has-child > ul > li > ul').each(function(index, el) {
    var itemWidth = $(this).outerWidth() + 66;
    if (maxWidth < itemWidth) {
        maxWidth = itemWidth
    }
});

$('.l-menu__list').on('mouseover', function(event) {
    if ($('.l-menu__inner > li').hasClass('open') || $('.l-menu').hasClass('second')) {
        $('.l-menu').css('width', maxWidth);
    }
});

$('.l-menu').on('mouseleave ', function(event) {
    $('.l-menu').removeAttr('style');
});


$('.sub-menu-trigger').on('click', function(event) {
    event.preventDefault();
    var thisItem = $(this).closest('.is-has-child');
    if (thisItem.hasClass('open')) {
        thisItem.removeClass('open');
        $('.sub-menu-trigger').removeClass('open');
        $('.l-menu').removeAttr('style').removeClass('open');
    } else {
        thisItem.addClass('open');
        $('.sub-menu-trigger, .l-menu').addClass('open');
    }
});


$('.l-menu__tabs-item1').on('click', function(event) {
    event.preventDefault();
    $('.l-menu__list').addClass('openslide');
    $('.l-menu__list').removeClass('closeslide');
    $('.l-menu__list.second').removeClass('openslide2');
    $('.l-menu__list.second').addClass('closeslide2');
    $('.l-menu').removeClass('second');
    $('.l-menu__tabs-item1').addClass('open');
    $('.l-menu__tabs-item2').removeClass('open');

    if (!$('.l-menu__inner > li').hasClass('open')) {
        $('.l-menu').removeAttr('style')
    }
});

$('.l-menu__tabs-item2').on('click', function(event) {
    event.preventDefault();
    $('.l-menu__list').removeClass('openslide');
    $('.l-menu__list').addClass('closeslide');
    $('.l-menu__list.second').addClass('openslide2');
    $('.l-menu__list.second').removeClass('closeslide2');
    $('.l-menu').addClass('second');
    $('.l-menu__tabs-item2').addClass('open');
    $('.l-menu__tabs-item1').removeClass('open');
});