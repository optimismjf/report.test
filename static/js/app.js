"use strict";

/**
 * Подключение JS файлов которые начинаются с подчеркивания
 */

/**
 * Возвращает функцию, которая не будет срабатывать, пока продолжает вызываться.
 * Она сработает только один раз через N миллисекунд после последнего вызова.
 * Если ей передан аргумент `immediate`, то она будет вызвана один раз сразу после
 * первого запуска.
 */
function debounce(func, wait, immediate) {
  var timeout = null,
      context = null,
      args = null,
      later = null,
      callNow = null;
  return function () {
    context = this;
    args = arguments;

    later = function later() {
      timeout = null;

      if (!immediate) {
        func.apply(context, args);
      }
    };

    callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
} // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license


;

(function () {
  var lastTime = 0,
      vendors = ['ms', 'moz', 'webkit', 'o'],
      x,
      currTime,
      timeToCall,
      id;

  for (x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
      currTime = new Date().getTime();
      timeToCall = Math.max(0, 16 - (currTime - lastTime));
      id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
})();

;

/* новые вспомогательные */

/* Показываем подсказки */

function showInform(event, show) {
	if(event) {
		var $this = event,
			offset = $this.target.getBoundingClientRect(),
			content = $this.target.getAttribute('data-content'),
			top = offset.bottom + 20 + 'px',
			horisont = window.outerWidth - $this.clientX < 310 ? 'right' : 'left',
			left,
			insertdiv,
			right;	
		if(show == 'show') {
			if(horisont == 'right') {
				left = 'unset';
				right = window.outerWidth - offset.right + 'px';
			} else {
				right = 'unset';
				left =  offset.left + $this.target.clientWidth + 'px';
			};
			$this.target.classList.add('inform-showed');
			insertdiv = document.createElement('div');
		    insertdiv.className = 'b-inform_content';
		    insertdiv.textContent = content;
			insertdiv.style.top = top;
			insertdiv.style.left = left;			
			insertdiv.style.right = right;
			$this.target.appendChild(insertdiv);
		} else if (show=="hide") {
			$this.target.classList.remove('inform-showed');
			$this.target.lastChild.remove();
		}
	}
};

/* Показываем действия с элементами */

function showActions(elem, action) {
	let actions = document.getElementById('table-actions') || false,
		a = document.querySelectorAll('.actions-showed');
	if(elem && actions) {
		if(action = "show") {
			var $this = elem,
				offset = $this.target.getBoundingClientRect(),
				vertical,
				top,
				left = offset.right + 10 + 'px';

			actions.removeAttribute("style");

			for (var i = 0; i < a.length; i++) {
			 	a[i].classList.remove('actions-showed');
			};

			actions.classList.remove('center-position');
			actions.classList.remove('top-position');
			actions.classList.remove('bottom-position');

			actions.style.display = 'block';

			if(document.body.clientHeight - offset.top < actions.clientHeight && offset.top < actions.clientHeight) {
				vertical = 'center';
				top = offset.bottom - actions.clientHeight / 2 + 'px'		
				
			} else if (document.body.clientHeight - offset.top < actions.clientHeight) {
				vertical = 'top';
				top = offset.bottom - actions.clientHeight - 3 + 'px'
			} else {
				vertical = 'bottom';
				top = offset.top + 3 + 'px';
			};

			actions.style.top = top;
			actions.style.left = left;
			actions.classList.add(vertical+'-position');			

			$this.target.classList.add('actions-showed');	
		}
	} else if (action == "hide" && actions) {
		actions.removeAttribute("style");
		actions.classList.remove('center-position');
		actions.classList.remove('top-position');
		actions.classList.remove('bottom-position');

		for (var i = 0; i < a.length; i++) {
		 	a[i].classList.remove('actions-showed');
		};
	}	
};

/* Наводим на строки во всех склонированных таблицах одновременно */

function hoverTr(tr, action='out') {
	if(action == 'hover') {
		var i = tr.index();
		$('.freeze-table table').each(function(index, table) {
			$(table).find('tbody tr:eq('+ i +')').addClass('hover');
		})
	} else if (action == 'out') {
		$('.freeze-table tbody tr').removeClass('hover');
	};	
}

/* ищем родителя по классу */

function findAncestor (el, cls) {
	if(el) {
		var elem = el.target;
		if(elem.getAttribute(cls)) {
			return elem.getAttribute(cls);
		} else {
			while (elem = elem.parentElement) {
				if(elem.getAttribute(cls)) {
					return elem.getAttribute(cls);
				}
			}
		}
	}
};

/* Мульти прослушка */
function addListenerMulti(el, s, fn) {
	if(el) {
		s.split(' ').forEach(e => el.addEventListener(e, fn, false));
	};
};

/* Функция для закрепления сайдбара */

function stickyAside(t, mt) {
	if(!$(t).length) return false;
	var offset = $(t).offset().top;	
	function stickThis() {
		if($(window).scrollTop() > offset) {
			$(t).css({'position' : 'fixed', 'top' : mt}).addClass('sticky');
		} else {
			$(t).removeAttr('style').removeClass('sticky');
		}
	};
	stickThis();
	$(window).on('scroll.aside', stickThis)	
};

/* Мини-плагин для закрепления фильтров */

(function () {
	var methods = {
		// инициализация плагина
		init:function(params) {
			if(!this.length) {
				console.warn('Plugin stickyFilters couldn\'t find target. Check the DOM'); 
				return false;
			};
			// значение по умолчанию
			var defaults = {
				dempfer: false,				
				width: this.outerWidth(),
				height: this.outerHeight(),
				offset: this.next().offset().top - this.outerHeight(),
				namespace: 'stickyFilters',
				container: $(window),
				containerEvent: 'resize',
				point: 0
			};
			// актуальные настройки, будут индивидуальными при каждом запуске
			var options = $.extend({}, defaults, params),
				dempferClass = options.namespace + '-dempfer';

			return this.each(function(){
				var target = $(this);
				if(options.dempfer)  {
					var dempfer = $('<div class="' + dempferClass + '"></div>')
						.insertAfter(this)
						.css('height', options.height)
						.hide();
				};
				target.css({
					'top' : options.point, 
					'width' : options.width
				});
				$(window).on('load.stickyFilters, scroll.stickyFilters', function(){
					if($(window).scrollTop() > options.offset) {
						target
							.css({'position' : 'fixed'});
						if(options.dempfer) dempfer.show();
					} else {
						target.css({'position' : 'static'});
						if(options.dempfer) dempfer.hide();
					}
				});

				options.container.on(options.containerEvent, function() {
					target.trigger(options.namespace + '-update')
				});

				target.on(options.namespace + '-update', function() {
					$('body,html').animate({scrollTop: 0}, 0);
					setTimeout(function() {
						if(options.dempfer) dempfer.css('height', 0);
						options.offset = target.offset().top;
						options.width = target.parent().outerWidth();
						options.height = target.outerHeight();

						target.css('width', options.width);
						if(options.dempfer) dempfer.css('height', options.height);
					}, 100);
				});
				
			});
	    },
	    destroy:function() {
	    	$(window).off('scroll.stickyFilters');
	   		$(this).removeAttr('style');
	   		$(this).next('[class*=dempfer]').remove()
	   	}
	};
	 
	$.fn.stickyFilters = function(method){
	    if ( methods[method] ) {
	        // если запрашиваемый метод существует, мы его вызываем
	        // все параметры, кроме имени метода прийдут в метод
	        // this так же перекочует в метод
	        return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	        // если первым параметром идет объект, либо совсем пусто
	        // выполняем метод init
	        return methods.init.apply( this, arguments );
	    } else {
	        // если ничего не получилось
	        $.error( 'Метод "' +  method + '" не найден в плагине jQuery.stickyFilters' );
	    }
	};

})(jQuery);

;(function ( $ ) {
	var options,
		methods = {
		init:function( params ) {
			// значение по умолчанию
			var defaults = {
				action: 'onetitle',
				namespace: 'overflowed'
			};
			// актуальные настройки, будут индивидуальными при каждом запуске
			options = $.extend({}, defaults, params);
			var action = options.action;

			if(action == 'onehover') {
				$(this).each(function(i, el) {

					if($(el)[0].getClientRects().length > 2) {
				        $(el).css({
				            'overflow' : 'hidden',
				            'max-height' : 27,
				            'display' : 'block'
				        }).attr('data-action', 'show-hover').attr('data-content',  $(el).text()).addClass(options.namespace)
				    }
				})
			} else if (action == 'allhover') {
				$(this).each(function(i, el) {
			        $(el).css({
			            'overflow' : 'hidden',
			            'max-height' : 27,
			            'display' : 'block'
			        }).attr('data-action', 'show-hover').attr('data-content',  $(el).text()).addClass(options.namespace)
				})
			} else if(action == 'onetitle') {
				$(this).each(function(i, el) {
					if($(el)[0].getClientRects().length > 2) {
				        $(el).css({
				            'overflow' : 'hidden',
				            'max-height' : 27,
				            'display' : 'block'
				        }).addClass(options.namespace)
				    }
				})
			} else if (action == 'alltitle') {
				$(this).each(function(i, el) {
			        $(el).css({
			            'overflow' : 'hidden',
			            'max-height' : 27,
			            'display' : 'block'
			        }).addClass(options.namespace)
				})
			}
			$(this).each(function(i, el) {
				if($(el)[0].scrollWidth <= $(el)[0].clientWidth) {

					$(el).data('title', $(el).attr('title')).removeAttr('title')
				} else {
					$(el).attr('title', $(el).data('title'))
				}
			});

			return this;
		},
		update:function( params ) {
			if(options == undefined) {
				this.hidenLinks(params);
				return this;
			};
			this.hidenLinks('destroy');
			options = $.extend({}, options, params);			
			this.hidenLinks(options);
			return this;
		},
		destroy:function( params ) {
			$('.b-inreports__table tbody tr td a').each(function(i, el) {
		        $(el).removeAttr('style').removeAttr('data-action').removeAttr('data-content').removeClass(options.namespace);
			});
			return this;
		}
	}
	$.fn.hidenLinks = function (method) {
		// немного магии
	    if ( methods[method] ) {
	        // если запрашиваемый метод существует, мы его вызываем
	        // все параметры, кроме имени метода прийдут в метод
	        // this так же перекочует в метод
	        return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	        // если первым параметром идет объект, либо совсем пусто
	        // выполняем метод init
	        return methods.init.apply( this, arguments );
	    } else {
	        // если ничего не получилось
	        $.error( 'Метод "' +  method + '" не найден в плагине jQuery.hidenLinks' );
	    }
	}
})(jQuery);

/* Плагин для работы с фильтрами */

(function( $ ) {

	var methods = {
		init:function(options) {
			this.container = $('#table-filters');
			this.options = options || {};


			$(document).on('click.filters', function(event){
				var e = event || window.event,
					that = e.target,
					$that = $(that);
				if($that.hasClass('b-inreports__addfilter') && !$that.hasClass('filters-show')) {
					showFilters(e, 'show')
				} else if(($that.hasClass('b-inreports__filters-badge') || $that.parent().hasClass('b-reports__filters-badge')) && !$that.hasClass('b-inreports__filters-badge-remove')) {
					showFilters(e, 'edit')
				} else if(!$that.hasClass('b-filters__helper-wrapper') && !$that.closest('.b-filters__helper-wrapper').length) {
					showFilters(e, 'hide')
				} else if ($that.hasClass('b-filters__header-select')) {
					toggle($that, $('.b-filters__body-select'));
				} else if ($that.hasClass('b-filters__body-select')) {
					toggle($that, $('.b-filters__header-select'), true);
				} else if ($that.hasClass('b-filters__header-select-item') || $that.hasClass('b-filters__body-select-item')) {
					showGroup($that);
				}
			});

			$(window).on('scroll.filters', function(e) {
				showFilters(e,'hide');
				hideSelectLists();	
			});

			$('.b-filters__body-group textarea, .b-filters__body-group input').on('focus', function(e) {
				hideSelectLists();
			});

			$('.b-inreports__filters-row').on('update', function () {
				if($('.b-inreports__filters-badge').length) {
					$('.b-inreports__filters-row').addClass('showed');
				} else {
					$('.b-inreports__filters-row').removeClass('showed');
				};

				$(window).trigger('resize');
				setTimeout(function() {
					$('.freeze-table').freezeTable('update');
				}, 100)
			});


		},
		update:function( options ) {
			return this
		},
		destroy:function( options ) {
			$(document).off('click.filters');
			return this
		}

	}

	$.fn.filters = function( method ){
		// немного магии
		if ( methods[method] ) {
			// если запрашиваемый метод существует, мы его вызываем
			// все параметры, кроме имени метода прийдут в метод
			// this так же перекочует в метод
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			// если первым параметром идет объект, либо совсем пусто
			// выполняем метод init
			return methods.init.apply( this, arguments );
		} else {
			// если ничего не получилось
			$.error( 'Метод "' +  method + '" не найден в плагине jQuery.filters' );
		}
	};

	function hideSelectLists() {
		$('.b-filters__body-select').removeClass('opened');
		$('.b-filters__body-select-list').hide().removeAttr('style');

		$('.b-filters__header-select').removeClass('opened');
		$('.b-filters__header-select-list').hide().removeAttr('style');
	};

	function toggle(target, enemy, fixed = false) {
		$(target).toggleClass('opened');
		enemy.removeClass('opened');
		enemy.next('[class$=list]').removeAttr('style');
		if(fixed) {
			if(target.hasClass('opened')) {
				target.next('[class$=list]').show().css({
					'position' : 'fixed',
					'top' : target.offset().top - $(window).scrollTop() + target.outerHeight() - 1,
					'left' : target.offset().left,
					'width' : target.outerWidth()
				});
			} else {
				target.next('[class$=list]').hide().removeAttr('style');
			}
		} else {
			target.next('[class$=list]').toggle()
		}
	}

	function showFilters(e, method = false) {
		var that = e.target,
			$that = $(e.target),
			filters = $('#table-filters'),
			filtersForm = filters.find('form'),
			offsets;
		if(method == 'show') {
			$('.filters-show').removeClass('filters-show');

			offsets = that.getBoundingClientRect();			
			filters.css({
				'top' : offsets.bottom + 10,
				'left' : offsets.left
			}).show();

			if(filters.attr('data-filter-action') != 'add-filter') {
				filtersForm[0].reset();
				filters.attr('data-filter-action', 'add-filter');
				$('.b-filters__header-select').text('Выберите колонку').removeClass('changed');
				$('.b-filters__header-select-list .active').removeClass('active');
				$('.b-filters__body-select-item:first-child').trigger('click');
				$('.b-filters__body, .b-filters__footer').attr('hidden', true);
			};

			$('[data-filter-action=add-filter] .b-filters__body-group textarea, [data-filter-action=add-filter] .b-filters__body-group input').off('keyup.filters change.filters').on('keyup.filters change.filters', function(e) {
				var check,
					type = $(this)[0].type,
					valThis;

				if (type == 'checkbox' || type == "radio") {
					check = $('.b-filters__body :checked').length ? false : true;
				} else if(type == 'number') {
					if($(this).siblings('[type=number]').length) {
						if($(this).siblings('[type=number]').val() == '' || $(this).val() == '') { 
							check = true;
						} else {
							check = false;
						}
					} else {
						check = $(this).val() == '';
					}					
				} else {
					check = $(this).val() == '';
				};

				$('.b-filters__submit').attr('disabled', check);
			});

			$that.addClass('filters-show');

		} else if (method == 'edit') {
			hideSelectLists();
			$('.filters-show').removeClass('filters-show');
			var options = $that.data('filter-options') || $that.parent().data('filter-options') || undefined;

			offsets = that.getBoundingClientRect();			
			filters.css({
				'top' : offsets.bottom,
				'left' : offsets.left
			}).show().attr('data-filter-action', 'edit-filter');

			$that.addClass('filters-show');
			$('.b-filters__header-select').text(options.name).addClass('changed');
			$('.b-filters__header-select-item[data-filter-group=' + options.group + ']').addClass('active');
			$('.b-filters__body-group[data-filter-group], .b-filters__body-row-group[data-filter-type]').removeClass('active');
			$('.b-filters__body').find('[data-filter-group=' + options.group + ']').addClass('active');
			if(options.typeparent) {
				$('.b-filters__body-group[data-filter-group=' + options.group + '], .b-filters__header-select-item[data-filter-group=' + options.typeparent + ']').addClass('active');
				$('.b-filters__body-select-item[data-filter-type=' + options.type + ']').trigger('click');
			}

			$.each(options.getarray, function(i, el) {
				if(el.value) {
					if(options.type == 'radio' || options.type == 'checkbox') {
						filters.find('[name=' + el.name + '][value=' + el.value + ']').trigger('click');
					} else {
						filters.find('[name=' + el.name + ']').val(el.value)
					}
				}
			});

			$('.b-filters__submit').attr('disabled', true);

			$('[data-filter-action=edit-filter] .b-filters__body-group textarea, [data-filter-action=edit-filter] .b-filters__body-group input').off('keyup.filters change.filters').on('keyup.filters change.filters', function(e) {
				var check,
					checkResult,
					checkNumber,
					type = $(this)[0].type;

				if(type == 'number') {
					if($(this).siblings('[type=number]').length) {
						if($(this).siblings('[type=number]').val() == '' || $(this).val() == '') { 
							checkNumber = true;
						} else {
							checkNumber = false;
						}
					} else {
						checkNumber = $(this).val() == '';
					}					
				} else {
					checkNumber = false;
				}

				checkResult = (filtersForm.serialize() === options.getstring);

				check = (checkNumber == false && checkResult == false) ? false : true;

				$('.b-filters__submit').attr('disabled', check);
			});
		} else {
			$('.filters-show').removeClass('filters-show');
			filters.find('.opened').removeClass('opened');
			filters.find('[style]').removeAttr('style');
			filters.removeAttr('style');
		}
	};

	function showGroup(target) {		
		var formGroup = target.data('filter-group') ? '[data-filter-group=' + target.data('filter-group') + ']' : '[data-filter-type=' + target.data('filter-type') + ']',
			text = target.text(),
			parent = target.closest('[class$="select-wrapper"]'),
			list = target.closest('[class$="select-list"]'),
			select = list.prev();
		select.removeClass('opened')
			.addClass('changed')
			.html(text);
		list.removeAttr('style');
		$('.b-filters__footer').removeAttr('hidden');
		$('.b-filters__body').removeAttr('hidden')
			.find(formGroup).addClass('active')
			.siblings().removeClass('active');
		$('.b-filters__helper-container')[0].reset();
		$('.b-filters__helper-container [type=submit]').attr('disabled', true);
	}
 
}( jQuery ));

function dataAction(e) {
	var action = $(this).data('action'),
		target = $(this).data('target') || undefined;
	switch(action) {
		case 'slide-target':
			/* Тоглим информацию на страницах отчетов */
			$(target).toggle();
			$(window).trigger('resize');
			if($('.freeze-table').length) setTimeout(function() {$('.freeze-table').freezeTable('update')}, 100);

			break;
		case 'clear-target':
			// Чистим инпуты
			$(target).val('').trigger('change');

			break;

		case 'remove-target':
			// удаляем цели
			var trigger = $(target).attr('data-filter-group') ? {'elem' : '.b-inreports__filters-row', 'type' : 'update'} : false;
			target = $(this).data('target');
			$(target).remove();
			if(trigger) {
				$(trigger.elem).trigger(trigger.type);
			}		

			break;

		case 'sort-column':
			/* Сортировка по колонке */
			var s = $(this).data('sortable'),
				tc = $('[data-sortable=' + s + ']'),
				ac = $('[data-sortable]:not([data-sortable=' + s + '])');
			ac.removeClass('sort-asc sort-desc');

			if(tc.hasClass('sort-asc')) {
				tc.removeClass('sort-asc').addClass('sort-desc');
			} else {
				tc.removeClass('sort-desc').addClass('sort-asc');
			}

			break;

		case 'switcher':
			/* Свитчер в сайдбаре */
			var target = $(e.target),
				$i = target.index(),
				$t = target.parent().data('target'),
				$target = $($t + ':eq(' + $i + ')');
			target.addClass('active').siblings().removeClass('active');
			$target.addClass('active').siblings().removeClass('active');

			break;

		case 'toggle-fullscreen':
			/* Тоглим рабочую область на весь экран */
			$('body').toggleClass('fullscreen').removeClass('aside-toggle');

			$(window).trigger('resize');
			if($('.freeze-table').length) $('.freeze-table').freezeTable('update');
			
			break;

		case 'toggle-aside':
			/* Тоглим сайдбар */
			$('body:not(.fullscreen)').toggleClass('aside-toggle');

			$(window).trigger('resize');
			if($('.freeze-table').length) $('.freeze-table').freezeTable('update');
			
			break;

		case 'toggle':
			/* Тоглим цель */
			$(this).toggleClass('active');
			$(target).toggleClass('open');
			
			break;

		case 'toggle-childs':
			/* Тоглим строки в таблице */
			$(this).toggleClass('open');
			$(target).toggle().toggleClass('show');

			hideChilds(target);
			$('.b-inreports__table tbody tr td a').hidenLinks('update');
			
			if($('.freeze-table').length) $('.freeze-table').freezeTable('update');
			break;

		case 'show-hover':
			/* Чтобы варны не выбивало */
			break;

		default:
			console.warn('Action for clicker \'dataAction()\' not found');
			break;
	}
};

function hideChilds(t) {
	let childToggles = $(t).find('[data-action=toggle-childs]');
	childToggles.each(function(e, child) {
		let childTarget = $(child).data('target');
		$(child).removeClass('open');
		$(childTarget).hide().removeClass('show')
		if($(childTarget).find('[data-action=toggle-childs]')) hideChilds(childTarget);
	});
};

;(function () {

	addListenerMulti(document, 'mouseover mouseout', function(event){
		var e = event || window.event;
		if(e.target.getAttribute('data-action') == 'show-hover') {
			var action = e.type == 'mouseover' ? 'show' : 'hide';
	        showInform(e, action);
	    }
	});

	document.addEventListener("click", function(event) {
		var e = event || window.event,
			t = e.target;
		if(t.classList.contains('b-inreports__table-edit') && e.target.getAttribute('data-item-id')) {
			if(t.classList.contains('actions-showed')) {
				showActions(false, 'hide');
			} else {
				showActions(e, 'show', e.target.getAttribute('data-item-id'));
			}			
		} else {
			showActions(false, 'hide');
		}
	});

	$(document).on('mouseover mouseout', '.freeze-table tbody tr', function(event) {
		var e = event || window.event,
			action = e.type == 'mouseover' ? 'hover' : 'out';
		hoverTr($(this), action)
	});

	$('.b-inreports__search-input').on('change keyup keydown', function() {
		if($(this).val() !== '') {
			$(this).siblings('[class$=clear]').show()
		} else {
			$(this).siblings('[class$=clear]').hide()
		}
	});

	$(document)
		.on('click', '[data-action]', dataAction)
		.filters();

	if($('.group-items').length) {
		$('.group-items').each(function(i, t) {
			$(t).find('.level-2').last().addClass('last-group');
			$(t).find('.level-3').last().addClass('last-group');
			var te = $(t).find('.level-3:not(.level-last):not(.last-group)');
			te.each(function(index, l) {
				let g = $(l).data('parent'),
					gr = $(t).find('[data-parent="' + g + '"]').last().find('[data-target]').data('target');
				$(gr).addClass('last-in-group')
			});
		});		
	};

	if($('.b-inreports__filters').length) $('.b-inreports__filters').stickyFilters({'dempfer' : true});
	if($('.b-inreports__aside').length) stickyAside('.b-inreports__aside', 0);

	if($('.freeze-table').length) {
		$('.freeze-table').freezeTable({
			fixedNavbar: $('.b-inreports__filters'),
			callback: function() {$('.b-inreports__table tbody tr td a').hidenLinks('update')},
			scrollBar: true
		});
	};

	window.onscroll = function() {
		showActions(false, 'hide');
	};

	$('#table-filters form').on('submit', function(event) {
		var e = event || window.event;

		e.preventDefault();
		var result = {},
			resultParams = $(this).serializeArray(),
			final = {},
			vmin,
			vmax;

		result.getarray = resultParams;
		result.getstring = $(this).serialize();

		result.type = $(this).find('[data-filter-type].active [data-filter-type].active').length ? $(this).find('[data-filter-type].active [data-filter-type].active').data('filter-type') : $(this).find('.b-filters__body-group.active').data('filter-type');
		result.group = $(this).find('.b-filters__body-group.active').data('filter-group');
		result.name = $(this).find('.b-filters__header-select.changed').text();
		

		$.each(resultParams, function(i, el){
			var n = el.name;
		 	if(el.value) {
		 		if(result.type == 'checkbox') {
		 			result.val = !result.val ? el.value : result.val + '&' + el.value;
		 			result.textval = !result.textval ? el.value : result.textval + ' или ' + el.value;
		 		} else if(result.type == 'text') {
		 			var tArr = el.value.split("\n");
		 			$.each(tArr, function(e, row) {
		 				result.val = !result.val ? row : result.val + '&' + row;
		 				result.textval = !result.textval ? row : result.textval + ' или ' + row;
		 			})
		 		} else if(el.name.indexOf('-min') > 0) {
		 			vmin = el.value
		 		} else if(el.name.indexOf('-max') > 0) {
		 			vmax = el.value
		 		} else {
					result.val = el.value;
					switch(result.type) {
						case 'count-over':
							result.textval = 'более ' + el.value;
							result.typeparent = 'count';
							break;
						case 'count-less':
							result.textval = 'менее ' + el.value;
							result.typeparent = 'count';
							break;
						default:
							result.textval = el.value;
							break
					}
		 		}
		 	}
		});

		if(!result.val) {
			result.val = vmin + '-' + vmax;
			if(vmin > vmax) {
				alert('Ошибка! Проверьте значения минимального и максимального количества');
				return false;
			}
			result.textval = 'от ' + vmin + ' до ' + vmax;
			result.typeparent = 'count';
		}

		var item = '<div class="b-inreports__filters-badge" data-filter-group="' + result.group + '" data-filter-options=\'' + JSON.stringify(result) + '\'><span title="' + result.name + ': ' + result.textval + '">' + result.name + ': ' + result.textval + '</span><div class="b-inreports__filters-badge-remove" data-action="remove-target" data-target=".b-inreports__filters-badge[data-filter-group=' + result.group + ']"></div></div>';

		if($('.b-inreports__filters-badge[data-filter-group=' + result.group + ']').length) {
			$('.b-inreports__filters-badge[data-filter-group=' + result.group + ']').replaceWith(item);
		} else {
			$('.b-inreports__filters-part-r').append(item);
		}
		
		$('.b-inreports__filters-row').trigger('update').trigger('click');

		$(this)[0].reset();
		$('.b-filters__submit').attr('disabled', true);

		return
	})
})();

;

;(function() { // for sitemap generation form
	$(document).on('click', function(e) {
		let t = $(e.target);
		if(!t.is('.b-form__select, .b-form__select-list')) {
			$('.b-form__select').removeClass('opened');
			$('.b-form__select-list').removeAttr('style');
		} 
	});
	$('.b-form__select').on('click', function() {
		let form = $(this).closest('form'),
			wrapper = $(this).closest('.b-form__select-wrapper'),
			list = wrapper.find('ul'),
			alist = form.find('ul'),
			aselect = form.find('.b-form__select');
		if($(this).hasClass('opened')) {
			aselect.removeClass('opened');
			alist.removeAttr('style');
		} else {
			aselect.removeClass('opened');
			alist.removeAttr('style');
			$(this).addClass('opened');
			list.show();
		};
	});

	$('.b-form__select-item').on('click', function() {
		let form = $(this).closest('form'),
			text = $(this).text(),
			val = $(this).data('value'),
			list = $(this).closest('ul'),
			select = list.prev(),
			wrapper = select.parent(),
			target = form.find(select.data('target'));

		select.addClass('changed').text(text);
		list.removeAttr('style');
		target.val(val);
	});


	if ($('#datepicker').length) {
		$( "#datepicker" ).datepicker({
			inline: true,
			showOn: "both",
			buttonImageOnly: true,
			buttonImage: "/images/icon/icon-calendar.svg",
			buttonText: "Дата модификации"
		});
	}

})();

$(function() { // for aside
	if($('.b-inreports__aside-menu-wrapper').length && !$('.b-inreports__aside').hasClass('in-process')) {
		$('.b-inreports__aside-menu-wrapper').niceScroll({
	      mousescrollstep: 10,
	      horizrailenabled: false,
	      cursorcolor: '#A2AEB7',
	      railpadding: {
	        top: 13,
	        right: 2,
	        left: 0,
	        bottom: 13
	      }
	    });
    }

    var maxWidth = 250,
    	slidingAside = false;

    if($('.b-inreports__aside-submenu-link').length) {
	    $('.b-inreports__aside-submenu-link').each(function(index, el){
			var itemWidth = $(el)[0].scrollWidth;
			console.log();
			if (maxWidth < itemWidth) {
				maxWidth = itemWidth;
				slidingAside = true
			}
		});
		
		$('.b-inreports__aside').on('mouseover', 
			function (event) {
				if (!$('body').hasClass('aside-toggle') && slidingAside) {
					$('.b-inreports__aside').css('width', maxWidth + 10);
					$('.b-inreports__aside-menu-wrapper').getNiceScroll().resize();
				}
		}).on('mouseout', function (event) {			
				$('.b-inreports__aside').removeAttr('style');
				$('.b-inreports__aside-menu-wrapper').getNiceScroll().resize();
			});
	}
});


(function () {
  // Test via a getter in the options object to see if the passive property is accessed
  var supportsPassiveOpts = null;

  try {
    supportsPassiveOpts = Object.defineProperty({}, 'passive', {
      get: function get() {
        window.supportsPassive = true;
      }
    });
    window.addEventListener('est', null, supportsPassiveOpts);
  } catch (e) {} // Use our detect's results. passive applied if supported, capture will be false either way.
  //elem.addEventListener('touchstart', fn, supportsPassive ? { passive: true } : false);

})();

function getSVGIconHTML(name, tag, attrs) {
  if (typeof name === 'undefined') {
    console.error('name is required');
    return false;
  }

  if (typeof tag === 'undefined') {
    tag = 'div';
  }

  var classes = 'svg-icon svg-icon--<%= name %>';
  var iconHTML = ['<<%= tag %> <%= classes %>>', '<svg class="svg-icon__link">', '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#<%= name %>"></use>', '</svg>', '</<%= tag %>>'].join('').replace(/<%= classes %>/g, 'class="' + classes + '"').replace(/<%= tag %>/g, tag).replace(/<%= name %>/g, name);
  return iconHTML;
}
/* ^^^
 * JQUERY Actions
 * ========================================================================== */


$(function () {
  'use strict';
  /**
   * определение существования элемента на странице
   */

  $.exists = function (selector) {
    return $(selector).length > 0;
  };
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
      railpadding: {
        top: 13,
        right: 5,
        left: 0,
        bottom: 13
      }
    });
  });
  $('.b-main-select select').select2({
    minimumResultsForSearch: -1
  });

  function dataSubscribe(state) {
    if (!state.id) {
      return state.text;
    }

    var $state = $('\n    <div class="' + state.element.dataset.name.toLowerCase() + '">\n    <span> ' + state.text + '</span>\n    <span>' + state.element.dataset.offer + '</span>\n    </div>\n    '); // <span>${state.element.dataset.count}</span>
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
      railpadding: {
        top: 13,
        right: 5,
        left: 0,
        bottom: 13
      }
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
  }); // prices menu hover

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
      railpadding: {
        top: 5,
        right: 0,
        left: 0,
        bottom: 5
      }
    });
  }, function () {
    $('.b-analysis-name').css('display', 'none');
  });
  $('.b-analysis__time-date').hover(function () {
    $('.b-analysis__select-wrap').css('display', 'block');
    $('.b-analysis__select_date').niceScroll({
      mousescrollstep: 10,
      cursorcolor: '#A2AEB7',
      railpadding: {
        top: 5,
        right: 5,
        left: 0,
        bottom: 5
      }
    });
  }, function () {
    $('.b-analysis__select-wrap').css('display', 'none');
  });
  $('.b-analysis-total__topic-date-wrap').hover(function () {
    $('.b-analysis-total__topic-date-body').css('display', 'block');
    $('.b-analysis__select_compare').niceScroll({
      mousescrollstep: 10,
      cursorcolor: '#A2AEB7',
      railpadding: {
        top: 5,
        right: 5,
        left: 0,
        bottom: 5
      }
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
  }); // switch the date

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
  }); // list of numbs

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
  }); // delete this one later

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

  $('.b-user-fileters__select_month select').change(function () {
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
      } // success

    });
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
  $('#radio1, #radio2').change(function () {
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
      $('body,html').animate({
        scrollTop: top
      }, 1500, function () {
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
    $('.b-promo-input__warning').fadeOut(); // $('.b-user-balance__promo-code-text').css('display', 'none')
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
  }); // report menu

  $(document).on('click', '.js-report-menu', function () {
    var $this = $(this);
    var context = $this.data('slidecontext');
    var selector = $this.data('slidetoggle');
    var $target = selector ? context ? $(selector, $this.closest(context)) : $(selector) : $this.closest(context); // const isActive = $target.hasClass('active')

    $this.toggleClass('active');
    $target.toggleClass('border');
    $target.show().animate({
      left: $target.hasClass('active') ? '-250' : '0',
      // the target class has to me 'left: -100%;'
      width: $target.hasClass('active') ? '0' : '250',
      marginRight: $target.hasClass('active') ? '19' : '0'
    }, 350, false, function () {
      $target.toggleClass('active'); // $target.toggle(!isActive)
    });
  }); // simle toggle script

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

  function createCookie(name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      var expires = "; expires=" + date.toGMTString();
    } else var expires = "";

    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];

      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }

      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
  }

  function eraseCookie(name) {
    createCookie(name, "", -1);
  }
  /*========================*/
  // открытие формы


  function openForm(button, title, content, position) {
    var openButton = button;
    var formId = openButton.attr('href');
    var fieldsTitle = title || '';
    var fieldsContent = content || '';
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
  }

  ; // закрытие формы

  function closeEditor() {
    $('.b-challenge-popup').removeClass('js-opened');
    $("html, body").animate({
      scrollTop: groupTextAddPosition
    }, 1000);
    $('.b-challenge__text-add .js-opened').removeClass('js-opened');
    $('.b-challenge-popup__form').slideUp();
  }

  ; // подсчет групп

  function groupLength() {
    $('.b-challenge__group-amount').html($('.b-challenge__group').length);
    challengeCalculation();
  }

  ; // подсчет ключевых слов

  function wordLength() {
    var wordLength = 0;
    $('[name="group-list"]').each(function (index, el) {
      $(this).val().split('\n').forEach(function (line, index) {
        if (line.length > 1) {
          wordLength++;
        }
      });
    });
    $('.b-challenge__word-amount').html(wordLength);
    challengeCalculation();
  }

  function challengeCalculation() {
    var textAnalysis = 0;
    var wordSearch = 0;
    var allSumm = 0;
    var userBalance = parseInt($('.users-tariff-balance').html().replace(' ', ''));
    var wordAmount = parseInt($('.b-challenge__word-amount').html());
    var groupAmount = parseInt($('.b-challenge__group-amount').html());
    var groupValue = 20;
    var wordValue = 1;
    var searchWordValue = 1;
    textAnalysis = groupAmount * groupValue + wordAmount * wordValue;
    wordSearch = wordAmount * searchWordValue;

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


  $('.b-authorization__event').on('click', function (event) {
    event.preventDefault();
    var activeForm = $(this).attr('href');
    $('.b-authorization__content').slideUp();
    $(activeForm).slideDown();
  }); // подсказка выезжающая

  $('.b-authorization__find').on('click', function (event) {
    event.preventDefault();
    $('.b-authorization__list--hidden').slideToggle();
  });

  if ($('.b-challane-check__editor').length) {
    /* текстовый редактор */

    /*========================*/
    tinymce.init({
      selector: '.b-challane-check__editor textarea',
      height: 720,
      menubar: false,
      plugins: ['advlist autolink lists link image charmap print preview anchor textcolor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table contextmenu paste code help wordcount'],
      toolbar: 'insert | undo redo |  formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
      content_css: ['//fonts.googleapis.com/css?family=Lato:300,300i,400,400i', '//www.tinymce.com/css/codepen.min.css'],
      setup: function setup(ed) {
        ed.on('keyup', function (e) {
          var textRedactor = $('.mce-tinymce');

          if (textRedactor.hasClass('error')) {
            hideErrorMessage(textRedactor);
          }
        });
      }
    });
  } // задание


  $('.b-challane-check__task-button a').on('click', function (event) {
    event.preventDefault();
    $('.b-challane-check__content--task').slideToggle();
  }); // Очистить

  $('.b-challane-check__editor-clear').on('click', function (event) {
    event.preventDefault();
    tinyMCE.activeEditor.setContent('');
  });
  $('input[type=tel]').attr('placeholder', '+7 (___) ___ - __ - __').mask("+7 (999) 999 - 99 - 99");
  $('form:not(.no-validate)').on('submit', function (event) {
    var formButton = $(this).find('button:not(.error):not([tabindex="-1"])');

    if (validationForm($(this))) {
      hideErrorMessage(formButton);

      if ($(this).hasClass('b-authorization__item b-authorization__item--restore-password')) {
        event.preventDefault();
        $('.b-authorization__content').slideUp();
        $('#password-sent').slideDown();
      }

      if ($(this).hasClass('b-challenge-popup__form--add-text')) {
        event.preventDefault();
        var openButton = $('.b-challenge__text-add-button.js-opened');
        var hisTitle = $(this).find('[name="add-text-title"]').val();
        var hisContent = tinyMCE.get('text-added').getContent();
        openButton.addClass('hide');

        if ($('.b-his.js-opened').length) {
          console.log('editor');
          $('.b-his.js-opened').find('.b-his__title').html(hisTitlse);
          $('.b-his.js-opened').find('.b-his__content').html(hisContent);
        } else {
          console.log('new');
          openButton.after('<div class="b-his"><a class="b-his__title" href="#add-text">' + hisTitle + '</a><a class="b-his__delete" href="#"><img src="images/icon/recycle.svg" title="Удалить" alt="Удалить"/></a><div class="b-his__content hide">' + hisContent + '</div></div>');
        }

        closeEditor();
      }

      if ($(this).hasClass('b-challenge-popup__form--batch-upload')) {
        event.preventDefault();
        var batchUpload = $(this).find('[name="batch-upload"]').val().split('\n');
        var groupCounter = 0;
        batchUpload.forEach(function (line, index) {
          if (index == 0) {
            $('.b-challenge__group').remove();
          }

          if (line != "") {
            addingGroup(line);
            groupLength();
            wordLength();
          }
        }); // проверяем поля и удаляем ключевое слово 'группа'

        $('[name="add-url"]').each(function (index, el) {
          var itemVal = $(this).val();

          if (itemVal.indexOf('https://') < 0) {
            if (itemVal.indexOf('http://') < 0) {
              $(this).val('');
            }
          }
        });
        closeEditor();
      }
    } else {
      showErrorMessage(formButton, 'Исправьте ошибки в полях формы');
      event.preventDefault();
    }
  });

  function validationForm(form) {
    var isNotFilled = true;
    var groupPages = false;
    form.find('input').each(function (index, el) {
      var formElement = $(this);
      var elementName = $(this).attr('name');
      var elementVal = formElement.val();
      var newPassword = formElement.closest('form').find('[name="newPassword"]').val();
      var emailPattern = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
      var urlPattern = /.+?\..+/i; // авторизация

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

      if (elementName == "newPassword" && elementVal.length >= 1 && elementVal.length <= 5 || elementName == "password" && elementVal.length >= 1 && elementVal.length <= 5) {
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
      } //==========


      if (elementName == "add-text-title" && elementVal == "") {
        isNotFilled = false;
        showErrorMessage(formElement, 'Заполните поле Title');
      } // создавние новой задачи


      if (elementName == "challenge-name" && elementVal == "") {
        isNotFilled = false;
        showErrorMessage(formElement, 'Введите название задачи');
      }

      if (elementName == 'picking' && formElement.attr('id') == 'radio2' && formElement.is(':checked')) {
        groupPages = true;
      }
    });
    form.find('textarea').each(function (index, el) {
      var formElement = $(this);
      var elementName = $(this).attr('name');
      var elementVal = formElement.val();

      if (elementName == 'add-text' && tinyMCE.get('text-added').getContent() == "") {
        isNotFilled = false;
        formElement = formElement.prev('.mce-tinymce');
        showErrorMessage(formElement, 'Добавьте текст');
      }

      if (elementName == 'batch-upload' && elementVal == "") {
        isNotFilled = false;
        showErrorMessage(formElement, 'Добавьте ключевые слова');
      } else if (elementName == 'batch-upload') {
        $('[name="batch-upload"]').val().split('\n').forEach(function (el, i) {
          if (/\t/.test(el)) {
            el.split('\t').forEach(function (line, i) {
              if ($.trim(line).length <= 1 && line != '') {
                isNotFilled = false;
              }
            });
          } else if (el != "") {
            console.log('tut');
            isNotFilled = false;
          }
        });

        if (!isNotFilled) {
          showErrorMessage(formElement, 'Проверьте данные на соответствие шаблону');
        }
      } // создавние новой задачи 


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
            if (~line.indexOf('https://') || ~line.indexOf('http://')) {} else {
              isNotFilled = false;
              showErrorMessage(formElement, 'Добавьте URL конкурентов');
            }
          });
        }
      }
    });
    return isNotFilled;
  } // Добавляет полю формы с ошибкой класс 'error' и сообщение об ошибке
  // а также проверяет, если все поля заполнены верно - убирает класс и ошибку у кнопки формы


  function showErrorMessage(element, errorMessage) {
    if (element.attr('type') == 'checkbox') {
      $(element).not('.error').addClass('error').next('label').after('<div class="error-text">' + errorMessage + '</div>');
    } else {
      $(element).not('.error').addClass('error').after('<div class="error-text">' + errorMessage + '</div>');
    }
  }

  ; // Удаляет класс 'error' и сообщение об ошибке

  function hideErrorMessage(element) {
    if (element.attr('type') == 'checkbox') {
      element.removeClass('error').next('label').next(".error-text").remove();
    } else {
      element.removeClass('error').next(".error-text").remove();
    }

    var elementForm = element.closest('form');

    if (!elementForm.find('.error:not(button)').length) {
      elementForm.find('button').removeClass('error').next(".error-text").remove();
    }
  }

  ;
  $(document).on('keyup', 'input', function (event) {
    var element = $(this);

    if ($(this).hasClass('error')) {
      var elementType = element.attr('type');

      if (elementType == 'password' && element.val().length > 5 || elementType != 'password' && element.val() != "") {
        hideErrorMessage(element);
      }
    }
  });
  $(document).on('change', 'input[type="checkbox"]', function (event) {
    var element = $(this);

    if ($(this).hasClass('error')) {
      hideErrorMessage(element);
    }
  });
  $(document).on('keyup', 'textarea', function (event) {
    var element = $(this);

    if ($(this).hasClass('error') && element.val() != "") {
      hideErrorMessage(element);
    }

    if (element.attr('name') == 'group-list') {
      wordLength();
    }
  });
  /* подсказка */

  /*========================*/

  $(document).on('click', '.b-help__button', function (event) {
    event.preventDefault();
    var helpWrap = $(this).closest('.b-help');
    helpWrap.toggleClass('js-opened');
  });
  $('.b-challane-check__reports-add').on('click', function (event) {
    event.preventDefault();
    openForm($(this), '', '');
  });
  $('body').on('mouseover', '.l-menu-line, .l-menu', function (event) {
    $('.l-menu').addClass('slide-open');
  });
  $('body').on('mouseout', '.l-menu-line, .l-menu', function (event) {
    if ($('.l-menu__button').hasClass('slide-open')) {
      $('.l-menu').addClass('slide-open');
    } else {
      $('.l-menu').removeClass('slide-open');
    }
  });
  $('.l-menu__button').on('click', function (event) {
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
  $.each($('.l-menu__inner').find('li'), function (index, element) {
    if ($(element).find('ul').length) {
      var triggerIcon = ['<div class="svg-icon svg-icon--angle-down">', '<svg class="svg-icon__link" fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">', '<path d="M7 10l5 5 5-5z"/> <path d="M0 0h24v24H0z" fill="none"/>', '</svg>', '</div>'].join('');
      var subMenuTrigger = $('<div class="sub-menu-trigger">' + triggerIcon + '</div>');
      $(element).addClass('is-has-child').append(subMenuTrigger);
    }
  });
  $.each($('.l-menu__list').find('li'), function (index, element) {
    if ($(element).find('ul').length) {
      $(element).addClass('is-has-child');
    }
  });
  $('.l-menu__list > .is-has-child > ul > li > ul').each(function (index, el) {
    var itemWidth = $(this).outerWidth() + 66;

    if (maxWidth < itemWidth) {
      maxWidth = itemWidth;
    }
  });
  $('.l-menu__list').on('mouseover', function (event) {
    if ($('.l-menu__inner > li').hasClass('open') || $('.l-menu').hasClass('second')) {
      $('.l-menu').css('width', maxWidth);
    }
  });
  $('.l-menu').on('mouseleave ', function (event) {
    $('.l-menu').removeAttr('style');
  });
  $('.sub-menu-trigger').on('click', function (event) {
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
  $('.l-menu__tabs-item1').on('click', function (event) {
    event.preventDefault();
    $('.l-menu__list').addClass('openslide');
    $('.l-menu__list').removeClass('closeslide');
    $('.l-menu__list.second').removeClass('openslide2');
    $('.l-menu__list.second').addClass('closeslide2');
    $('.l-menu').removeClass('second');
    $('.l-menu__tabs-item1').addClass('open');
    $('.l-menu__tabs-item2').removeClass('open');

    if (!$('.l-menu__inner > li').hasClass('open')) {
      $('.l-menu').removeAttr('style');
    }
  });
  $('.l-menu__tabs-item2').on('click', function (event) {
    event.preventDefault();
    $('.l-menu__list').removeClass('openslide');
    $('.l-menu__list').addClass('closeslide');
    $('.l-menu__list.second').addClass('openslide2');
    $('.l-menu__list.second').removeClass('closeslide2');
    $('.l-menu').addClass('second');
    $('.l-menu__tabs-item2').addClass('open');
    $('.l-menu__tabs-item1').removeClass('open');
  });
  /* подбор конкурентов */

  /*========================*/

  $('.b-challenge__item--picking input[type="radio"]').on('change', function (event) {
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
  var regionList = $('.b-challenge__region-list');
  regionInput.keyup(function (event) {
    var searchText = regionInput.val();

    if (event.keyCode != 40 && event.keyCode != 38 && event.keyCode != 13) {
      if (searchText.length >= 2) {
        searchText = searchText[0].toUpperCase() + searchText.slice(1);
        regionList.addClass('js-opened');
        var numberSerch = 0;
        $('.b-challenge__region-list li span').each(function (index, el) {
          var item = $(this).closest('.b-challenge__region-list li');
          var itemName = $(this).text();
          item.removeClass('active');

          if (itemName.indexOf(searchText) >= 0) {
            item.addClass('js-search');
            $(this).closest('.b-challenge__region-list li').fadeIn();
            item.data('number', numberSerch);
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
      var searchList = $('.js-search');
      var searchListLength = searchList.length;
      var searchListActive = $('.js-search.active');
      var searchListActiveIndex = searchListActive.data('number');

      if (event.keyCode == 40) {
        if (!searchList.hasClass('active')) {
          searchList.eq(0).addClass('active').focus();
        } else {
          if (searchListActiveIndex < searchListLength - 1) {
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

      regionInput.val($('.js-search.active span').html()).data('region', $('.js-search.active').data('index'));
    }
  });
  $('.b-challenge__region-list li').on('click', function (event) {
    $('.js-search').removeClass('active');
    $(this).addClass('active');
    regionInput.val($('.js-search.active span').html()).data('region', $('.js-search.active').data('index'));
    regionList.removeClass('js-opened');
    hideErrorMessage(regionInput);
  });
  /* потеря фокуса */

  /*========================*/

  regionInput.blur(function (event) {
    var formElement = $(this);
    var formElementVal = formElement.val();
    var formElementError = true;

    if (formElementVal.length > 0) {
      $('.b-challenge__region-list li').each(function (index, el) {
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

  $(document).click(function (event) {
    if ($(event.target).closest(".b-challenge__region").length) {
      return;
    }

    regionList.removeClass('js-opened');
    event.stopPropagation();
  });
  /* добавление группы */

  /*========================*/

  $('.b-challenge__group-add a').on('click', function (event) {
    event.preventDefault();
    addingGroup();
  });
  /* удаление группы */

  /*========================*/

  $(document).on('click', '.b-challenge__group-delete', function (event) {
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

  $(document).on('change', '.b-challenge__group-add-text [type="radio"]', function (event) {
    $(this).closest('.b-challenge__group-add-text').find('.js-text-add').slideToggle();
  });
  /* текстовый редактор */

  /*========================*/

  tinymce.init({
    selector: '.b-challenge-popup textarea#text-added',
    height: 300,
    menubar: false,
    plugins: ['advlist autolink lists link image charmap print preview anchor textcolor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table contextmenu paste code help wordcount'],
    toolbar: 'insert | undo redo |  formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
    content_css: ['//fonts.googleapis.com/css?family=Lato:300,300i,400,400i', '//www.tinymce.com/css/codepen.min.css'],
    setup: function setup(ed) {
      ed.on('keyup', function (e) {
        var textRedactor = $('.mce-tinymce');

        if (textRedactor.hasClass('error')) {
          hideErrorMessage(textRedactor);
        }
      });
    }
  }); // открытие редактора

  var groupTextAddPosition = 0;
  $(document).on('click', '.b-challenge__text-add-button', function (event) {
    event.preventDefault();
    openForm($(this), '', '', true);
  }); // удаление добавленного текста 

  $(document).on('click', '.b-his__delete', function (event) {
    event.preventDefault();
    var hisBlock = $(this).closest('.b-his');
    hisBlock.prev('.hide').removeClass('hide');
    hisBlock.remove();
  }); // открытие созданного проекта 

  $(document).on('click', '.b-his__title', function (event) {
    event.preventDefault();
    var itemTitle = $(this).html();
    var itemContent = $(this).closest('.b-his').find('.b-his__content').html();
    openForm($(this), itemTitle, itemContent, true);
  }); // закрытие формы

  $('.b-challenge-popup__close, .b-challenge-popup__cancel').on('click', function (event) {
    event.preventDefault();
    closeEditor();
  });
  /* пакетное добавление */

  /*========================*/

  $('.b-challenge__batch-upload').on('click', function (event) {
    event.preventDefault();
    openForm($(this), '', '');
  }); // табуляция  

  $("textarea").keydown(function (event) {
    // не кропка tab - выходим
    if (event.keyCode !== 9) {
      return;
    }

    event.preventDefault(); // Opera, FireFox, Chrome

    var textarea = $(this)[0],
        selStart = textarea.selectionStart,
        selEnd = textarea.selectionEnd,
        slection = textarea.value.substring(selStart, selEnd),
        slection_new = '',
        before = textarea.value.substring(0, selStart),
        after = textarea.value.substring(selEnd, textarea.value.length); // добавляем tab

    if (!event.shiftKey) {
      selStart++;

      if (slection.trim()) {
        slection_new = slection.replace(/^/gm, function () {
          selEnd++;
          return "\t";
        });
      } else {
        slection_new = "\t";
        selEnd++;
      }
    } // убриаем табы
    else {
        // если символ до выделения тоже \t удаляем и его
        if (before[before.length - 1] === "\t") {
          before = before.substring(0, before.length - 1);
          selStart--;
          selEnd--;
        }

        slection_new = slection.replace(/^\t/gm, function () {
          selEnd--;
          return "";
        });
      }

    textarea.value = before + slection_new + after; // курсор

    textarea.setSelectionRange(selStart, selEnd);
  });
  /* поиск тематических слов */

  $('#b-checkSum2').on('change', function (event) {
    challengeCalculation();
  });
  /*========================*/

  /* Функциональная часть */

  /*========================*/
  // новая группа

  var groupCounter = 0;
  var newGroup = '<div class="b-challenge__group new-group"><a href="#" class="b-challenge__group-delete"><img src="images/icon/back_red.svg" alt="delete"></a><div class="b-challenge__group-list"><textarea name="group-list" cols="30" rows="10" placeholder="Список запросов"></textarea></div><div class="b-challenge__group-add-text"><div class="b-challenge__group-item"><div class="b-challenge__group-item-title">Добавить свой текст</div><div class="b-main-radios"><div class="b-main-radios__item"><input type="radio" name="selection" id="radio3" checked=""><label for="radio3">по URL</label></div><div class="b-main-radios__item"><input type="radio" name="selection" id="radio4"><label for="radio4">через форму</label></div></div><input type="text" name="add-url" placeholder="http://" class="js-text-add"><div class="b-challenge__text-add js-text-add"><a href="#add-text" class="b-challenge__text-add-button">Добавить текст</a></div></div><div class="b-challenge__group-item b-challenge__group-item--pages js-auto-fit"><textarea name="group-pages" cols="30" rows="7" placeholder="Страницы конкурентов"></textarea></div></div></div>';

  function addingGroup(line) {
    var challengeGroup = $(newGroup);
    var challengeGroupRadio = challengeGroup.find('[type="radio"]');
    var groupListText = '';
    var addurlText = '';
    groupCounter++; // делаем поля уникальными

    challengeGroupRadio.attr('name', challengeGroupRadio.attr('name') + groupCounter);
    challengeGroupRadio.each(function (index, el) {
      $(this).attr('id', $(this).attr('id') + groupCounter);
      $(this).next('label').attr('for', $(this).next('label').attr('for') + groupCounter);
    }); // пакетное добавление

    if (line) {
      line.split('\t').forEach(function (field, index) {
        if (index == 0) {
          groupListText = field;
        } else {
          addurlText = field;
        }
      });
      challengeGroup.find('[name="group-list"]').val(groupListText).end().find('[name="add-url"]').val(addurlText); // сортируем по группам

      $('[name="add-url"]').each(function (index, el) {
        if ($(this).val() == addurlText) {
          challengeGroup = '';
          var neededList = $(this).closest('.b-challenge__group').find('[name="group-list"]');
          neededList.val(neededList.val() + '\n' + groupListText);
        }
      });
    } // вставка группы


    $('.b-challenge__group-add').before(challengeGroup); // проверка подбора конкурентов

    if ($('[name="picking"]:checked').attr('id') == 'radio2') {
      $('.new-group').find('.js-auto-fit').fadeIn().addClass('js-picking');
    } // показываем кнопку удалить


    if ($('.b-challenge__group').length > 1) {
      $('.b-challenge__group-delete').addClass('js-show');
    } // подсчитываем кол-во групп


    groupLength(); // удаляем класс новой группы

    $('.new-group').removeClass('new-group');
  }

  ; // region json 

  if ($('.b-challenge__region-list').length) {
    // проверяем есть ли в localStorage json
    if (localStorage.getItem('regionList')) {
      // если есть json, данные берем из него
      var regionJson = JSON.parse(localStorage.getItem("regionList"));
      regionJson.forEach(function (item) {
        $('.b-challenge__region-list').append('<li data-region="' + item.region + '" data-index="' + item.index + '"><span>' + item.city + '</span></li>');
      });
    } else {
      // если jsona нет, делаем ajax запрос 
      $.getJSON('regionList.json', function (regionList) {
        var regionList = JSON.stringify(regionList);
        localStorage.setItem("regionList", regionList);
        regionList.forEach(function (item) {
          $('.b-challenge__region-list').append('<li data-region="' + item.region + '" data-index="' + item.index + '"><span>' + item.city + '</span></li>');
        });
      });
    }
  }

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
    var rubCheck = $(currentOwlSlide).find('.check-rub').is(':checked'); // const targetCurArray = [changedItem1, changedItem2]

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
      }); // targetCurArray.map((item) => {
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
        }); // targetCurArray.map((item) => {
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
        }); // targetCurArray.map((item) => {
        //   $(item).addClass('active')
        // })
        // $(changedItem1).find('.cur-change').text($(changedItem1).data('default') - ($(changedItem1).data('default') * Discount) / 100)
        // $(changedItem2).find('.cur-change').text(
        //   ($(changedItem2).data('default') - ($(changedItem2).data('default') * Discount) / 100).toFixed(3),
        // )
      }
    }
  } // change tariff prices.html


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
  $('.b-balance-tabs__button').on('click', function (event) {
    event.preventDefault();
    var itemId = $(this).attr('href');
    var buttonWrap = $(this).closest('.b-balance-tabs__buttons');
    buttonWrap.slideUp();
    $(itemId).slideDown();
  });
  $('.b-user-balance__cansel-btn').on('click', function (event) {
    event.preventDefault();
    $('.b-balance-tabs__item').slideUp();
    $('.b-balance-tabs__buttons').slideDown();
  });
  $('.b-user-balance__input_summ input').keyup(function () {
    var itemSumm = parseInt($(this).val()) || 0;
    $(this).closest('.b-balance-tabs__item').find('.b-user-balance__total-limit .b-numb').html(itemSumm);
  });
  $('.b-user-balance__money-push_docs').on('click', function (event) {
    event.preventDefault();
    var itemWrap = $(this).closest('.b-balance-tabs__item');
    var buttonWrap = $(this).closest('.b-user-balance__cansel-wrapper');

    if (!itemWrap.find('.answer-block').length) {
      buttonWrap.after('<div class="answer-block"></div>');
    }

    var answerBlock = $('.answer-block');
    answerBlock.html('<div class="block-preloader"><span></span><span></span><span></span></div>');
    itemWrap.addClass('js-blocking');
    setTimeout(function () {
      itemWrap.removeClass('js-blocking');
      answerBlock.html('');
      answerBlock.append('<div class="b-user-balance__notify b-user-balance__notify_up"><div class="b-user-balance__notify-text">Средства будут зачислены на баланс после оплаты по документам: <p><a class="uploading-document" href="#"><i class="far fa-file-pdf"></i>Договор</a><a class="uploading-document" href="#"><i class="far fa-file-pdf"></i>Счёт-фактура</a></p></div></div><div class="block-error">Ошибка отправки данных. <br />Попробуйте ещё раз.</div>');
    }, 3000);
  });
  $('.buy-limits').on('click', function (event) {
    var amountLimits = $('.limits-amount').html();
    createCookie('buyLimits', amountLimits);
  });
  /*===============================================*/
  // GLOBALS

  var $hash = window.location.hash;
  var tariffUrlCount = $hash.match(/\d+/);
  var tariffUrlString = $hash.match(/[a-zA-Z]+/g); // rest of code

  if ($hash === '#b-reqv') {
    $('.b-personal-data__btn span').text('Скрыть реквизиты фирмы');
    $('.b-personal-form__requisites').slideDown();
    var top = $($hash).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1500);
  }

  if (tariffUrlCount) {
    $('.b-user-balance__select_price select option').each(function (index, el) {
      $('.b-user-balance__select_price select').val(tariffUrlCount[0]).trigger('change');
    });
  } // settings01.html переход на другую страницу и смена данных на основе выбора пользователя


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
          $('.b-user-balance__input_summ input').val(amountLimits).trigger('keyup');
        }

        $('[href="#' + tariff + '"]').trigger('click');
      } else if (tariff != 'off' && tariff != 'buy') {
        $(content).slideDown();
        $(targetSelect).val(obj[tariff]).trigger('change');
        $('.b-balance-tabs__button--subscription').trigger('click');
      }

      var _top = $('.b-user-balance').offset().top;
      $('body,html').animate({
        scrollTop: _top
      }, 1500);
    };

    goToPage(mainTarrif, tariffObj);
  }

  $('.b-projects__search input').keyup(function (event) {
    var searchText = $(this).val();
    var projectItem = '.b-projects-table__line';
    var projectItemWrap = '.b-projects-table__content';
    var pagePagination = '.b-page-nav';
    $(projectItem).removeClass('js-search');

    if (searchText.length >= 2) {
      if ($('.b-page-nav').length > 0) {
        alert("ajax");
        $(projectItemWrap + ',' + pagePagination).addClass('js-blocking');
        $(projectItemWrap).prepend('<div class="block-preloader"><span></span><span></span><span></span></div>');
        setTimeout(function () {
          $(projectItemWrap + ',' + pagePagination).removeClass('js-blocking');
          $(projectItemWrap).find('.block-preloader').remove();
        }, 3000);
      } else {
        $('.b-projects-table__link a span').each(function (index, el) {
          var item = $(this).closest(projectItem);
          var itemName = $(this).text();

          if (itemName.indexOf(searchText) >= 0) {
            item.addClass('js-search');
            $(this).closest(projectItem).fadeIn();
          } else {
            $(this).closest(projectItem).fadeOut();
          }
        });
      }
    } else if (searchText.length == 0 && $('.b-page-nav').length <= 0) {
      $(projectItem).fadeIn();
    }
  });
  $('.b-analysis-name__search input').keyup(function (event) {
    var searchText = $(this).val();
    var projectItem = '.b-analysis-name__item';
    var projectItemWrap = '.b-analysis-name__body';
    $(projectItem).removeClass('js-search');

    if (searchText.length >= 2) {
      if ($(projectItem).length >= 30) {
        alert("ajax");
        $(projectItemWrap).addClass('js-blocking');
        $(projectItemWrap).before('<div class="block-preloader"><span></span><span></span><span></span></div>');
        setTimeout(function () {
          $(projectItemWrap).removeClass('js-blocking');
          $(projectItemWrap).prev('.block-preloader').remove();
        }, 3000);
      } else {
        $('.b-analysis-name__sitename a').each(function (index, el) {
          var item = $(this).closest(projectItem);
          var itemName = $(this).text();

          if (itemName.indexOf(searchText) >= 0) {
            item.addClass('js-search');
            $(this).closest(projectItem).fadeIn();
          } else {
            $(this).closest(projectItem).fadeOut();
          }
        });
      }
    } else if (searchText.length == 0 && $(projectItem).length < 30) {
      $(projectItem).fadeIn();
    }
  }); // Ключи без вхождения

  $(document).on('click', '.b-reports-table__more', function (event) {
    event.preventDefault();
    var itemContent = $(this).closest('.b-reports-table').find('.b-reports-table__hidden');

    if ($(this).hasClass('js-opened')) {
      $(this).removeClass('js-opened');
      itemContent.stop().slideUp();
    } else {
      $(this).addClass('js-opened');
      itemContent.stop().slideDown();
    }
  }); // удаление ключевика

  $(document).on('click', '.b-reports-table__item-delete', function (event) {
    event.preventDefault();
    var deleteItem = $(this).closest('.b-reports-table__item');
    var tableWrap = $(this).closest('.b-reports-table');
    var deleteINewtem = $(this).closest('.b-reports-table__item--new');
    deleteItem.find('.b-reports-table__mark').html('');

    if (deleteINewtem.find('.b-reports-table__name input').val() == '') {
      deleteINewtem.remove();
    } else {
      // проверяем, если нет кнопки "добавить" добавляем 
      if (!deleteItem.find('.b-reports-table__item-add').length) {
        deleteItem.append('<a href="#" class="b-reports-table__item-add">добавить</a>');
      } // если нет блока для ключей без вхождения, создаём кнопку и блок


      if (!tableWrap.find('.b-reports-table__hidden').length) {
        tableWrap.find('.b-reports-table__add').prepend('<a href="#" data-open="Ключи без вхождения" data-close="Скрыть ключи без вхождения" class="b-reports-table__more"></a>');
        tableWrap.append('<div class="b-reports-table__hidden"></div>');
      }

      tableWrap.find('.b-reports-table__hidden').prepend(deleteItem);
    }
  }); // добавление нового ключевика

  var keywordItem = '<div class="b-reports-table__item b-reports-table__item--new"><div class="b-reports-table__name"><input type="text"></div><div class="b-reports-table__stat"></div><div class="b-reports-table__mark"><input type="text" placeholder="—"></div><div class="b-reports-table__mark b-reports-table__mark--no"><input type="text" placeholder="—"></div><div class="b-reports-table__mark b-reports-table__mark--no"><input type="text" placeholder="—"></div><a href="#" class="b-reports-table__item-delete">удалить</a></div>';
  $('.b-reports-table__add-item').on('click', function (event) {
    event.preventDefault();
    var blockAdding = $(this).closest('.b-reports-table__add');
    blockAdding.before(keywordItem);
    blockAdding.prev('.b-reports-table__item').find('.b-reports-table__name input').focus();

    if ($(this).closest('.b-reports-table').hasClass('b-reports-table--min')) {
      blockAdding.prev('.b-reports-table__item').find('.b-reports-table__mark:eq(0), .b-reports-table__mark:eq(1)').remove();
    }
  }); //  добавлениеключевика в основной список

  $(document).on('click', '.b-reports-table__item-add', function (event) {
    event.preventDefault();
    var thisItem = $(this).closest('.b-reports-table__item');
    var itemWrap = thisItem.closest('.b-reports-table__hidden');
    var hiddenButton = itemWrap.closest('.b-reports-table').find('.b-reports-table__more');
    thisItem.find('.b-reports-table__mark').html('<input type="text" placeholder="—">');
    $(this).closest('.b-reports-table').find('.b-reports-table__add').before(thisItem);

    if (!itemWrap.find('.b-reports-table__item').length) {
      itemWrap.remove();
      hiddenButton.remove();
    }
  });
  $(document).on('click', '.b-reports__entrance', function (event) {
    event.preventDefault();
    $(this).toggleClass('js-active');
  });
  $(document).on('click', '.b-reports__button', function (event) {
    event.preventDefault();
    var itemContent = $(this).closest('.b-reports').find('.b-reports__content');

    if ($(this).hasClass('js-close')) {
      $(this).removeClass('js-close');
      itemContent.stop().slideDown();
    } else {
      $(this).addClass('js-close');
      itemContent.stop().slideUp();
    }
  });
  /* ----------------------------------------------------------------------*/
  // settings2 summ function

  var yaInput = '#b-check15';
  var input = $('.b-user-counts__input input');
  var goInput = '#b-check17';
  var inputPriceindexing = $(input).data('priceindexing');
  var inputListPrice = $(input).data('listprice');
  var inputMinimalPrice = $(input).data('minimalprice');
  var inputLimitPage = $(input).data('limitpage');
  var formButton = $('.b-user-counts__btn-start');

  var changeTotalSum = function changeTotalSum() {
    var inputValue = parseInt($(input).val());
    var inputPrice = inputValue * inputListPrice;
    var checkPrice = inputValue * inputPriceindexing;
    var userBalance = parseInt($('.users-tariff-balance').html().replace(' ', ''));

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
        totalSum = inputMinimalPrice;
      }
    } else {
      var totalSum = 0;
    }

    inputPrice = inputPrice.toFixed(2);
    totalSum = totalSum.toFixed(2);
    checkPrice = checkPrice.toFixed(2);

    if (totalSum > userBalance) {
      var lacksLimits = totalSum - userBalance;
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

  $(yaInput + ',' + goInput).change(function () {
    changeTotalSum();
  });
  $(input).keyup(function () {
    changeTotalSum();
  });
  /* main checkbox */

  $('.b-main-checkbox.disabled').find('input').attr('disabled', true);
  /* settings2 autostart */

  $('#b-check16').change(function () {
    if ($(this).is(':not(:checked')) {
      $('.b-settings-autostart__select select').attr('disabled', true);
      $('.b-settings-autostart').addClass('disabled');
      $('.b-user-counts__date').fadeOut();
    } else {
      $('.b-settings-autostart__select select').attr('disabled', false);
      $('.b-settings-autostart').removeClass('disabled');
      $('.b-user-counts__date').fadeIn();
    }
  });
  $('.b-settings-autostart__select select').on('select2:select', function (e) {
    autostartDate();
  });

  $('.b-settings-autostart__input input').on('keydown', function(event) {
  	console.log(event.keyCode);
  
    // Разрешаем: backspace, delete, tab и escape
    if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
      // Разрешаем: Ctrl+A
      (event.keyCode == 65 && event.ctrlKey === true) ||
      // Разрешаем: home, end, влево, вправо
      (event.keyCode >= 35 && event.keyCode <= 39)) {
      	
    } else {
      // Запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
      if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
		event.preventDefault();
      }
    }
  });
  $('.b-settings-autostart__input input').on('keyup', function(event) {
  	if($(this).val() < 1) {
  		$(this).val('1');
  	} else if ($(this).val() > 30){
  		$(this).val('30');
  	}
  	autostartDate();
  });



  function autostartDate() {
    var period = $('.b-settings-autostart__select--period select option:selected').val();
    var week = '.b-settings-autostart__select--week';
    var month = '.b-settings-autostart__select--month';
    var ndays = '.b-settings-autostart__input--ndays';
    var weekIndex = $(week).find('select option:selected').val();
    var monthIndex = $(month).find('select option:selected').val();
    var ndaysIndex = $(ndays).find('input').val();
    var date = new Date();
    var dayIndex = date.getDay();
    var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']; // Определяем сегодняшнее число в формате dd.mm.yy

    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yy = date.getFullYear() % 100; // вычисляем сколько дней в месяце

    var daysInMonth = new Date(yy, mm, 0);
    daysInMonth = daysInMonth.getDate(); // вычисляем сколько дней в следующем месяце

    var daysNextMonth = new Date(yy, mm + 1, 0);
    daysNextMonth = daysNextMonth.getDate(); // изменение даты автозапуска относительно выбранного периода

    if (period == 'День') {
      $(week + ', ' + month + ', ' + ndays).fadeOut();
      dd = dd + 1;
      necessarytest(dd, mm, yy);
    } else if (period == 'Неделя') {
      $(week).fadeIn();
      $(month).hide();
      $(ndays).hide();

      for (var i = 0; i < days.length; i++) {
        if (days[i] == weekIndex) {
          weekIndex = i;

          if (weekIndex == 0) {
            weekIndex = 7;
          }
        }
      }

      if (weekIndex <= dayIndex) {
        dd = dd + (7 - dayIndex) + weekIndex;
      } else {
        dd = dd + weekIndex - dayIndex;
      }

      necessarytest(dd, mm, yy);
    } else if (period == 'Месяц') {
      $(month).fadeIn();
      $(week).hide();
      $(ndays).hide();
      mm = mm + 1;

      if (monthIndex > daysNextMonth) {
        dd = daysNextMonth;
      } else {
        dd = monthIndex;
      }

      necessarytest(dd, mm, yy);
    } else if (period == 'N дней') {
      $(ndays).fadeIn();
      $(week).hide();
      $(month).hide();

      dd = dd + parseInt(ndaysIndex);

      necessarytest(dd, mm, yy);
    }
  }

  ;

  function necessarytest(dd, mm, yy) {
  	/* формируем новую дату по пришедшим данным*/
    var ndate = new Date(yy, mm - 1, dd);

    dd = ndate.getDate();
    mm = ndate.getMonth() + 1;
    yy = ndate.getFullYear() % 100;

    ;

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    $('.autostart-date').html(dd + '.' + mm + '.' + yy);
  }

  autostartDate();
  $('.b-statistics__table-item').each(function (index, el) {
    var thisTable = $(this);
    var firstCollWidth = thisTable.find('td').eq(0).innerWidth();
    var tableClone = thisTable.clone(true);
    tableClone.removeClass('b-statistics__table-item--original').addClass('b-statistics__table-item--fake').css('left', firstCollWidth + "px").find('.b-statistics__table-item-inner').css('margin-left', "-" + firstCollWidth + "px");
    thisTable.after(tableClone);
  }); // подстветка строки таблицы

  $(document).on('mouseenter', '.b-statistics__table tr:not(.description)', function (event) {
    var itemIndex = $(this).index();
    $(this).closest('.b-statistics__table').find('.b-statistics__table-item').each(function (index, el) {
      $(this).find('tr:eq(' + itemIndex + ')').addClass('js-hover');
    });
  });
  $(document).on('mouseleave', '.b-statistics__table tr.js-hover', function (event) {
    $('tr.js-hover').removeClass('js-hover');
  }); // подстветка ячейки таблицы

  $(document).on('mouseenter', '.table-mark', function (event) {
    var itemMod = $(this).data('mod');
    $(this).closest('tr').find('.table-mark[data-mod="' + itemMod + '"]').addClass('js-hover');
  });
  $(document).on('mouseleave', '.table-mark.js-hover', function (event) {
    $('.table-mark.js-hover').removeClass('js-hover');
  }); // ключи без вхождений 

  $('.b-statistics__key input').on('change', function (event) {
    var itemTableHidden = $('.b-statistics__table--hidden');

    if ($(this).is(':checked')) {
      itemTableHidden.slideDown();
    } else {
      itemTableHidden.slideUp();
    }
  });
  /* вкладки отчёт */

  /*========================*/

  $('.b-reports-tabs a').on('click', function (event) {
    event.preventDefault();

    if (!$(this).hasClass('js-active')) {
      $('.b-reports-tabs a').removeClass('js-active');
      $('.b-reports-tabs-block').hide();
      var activeItem = $(this).attr('href');
      $(this).addClass('js-active');
      $(activeItem).show();
    }
  }); // disabled по checkbox 

  $('.b-task__checkbox input').on('change', function (event) {
    var itemTableHidden = $(this).closest('.b-task__item').find('.b-task__item-content');

    if ($(this).is(':checked')) {
      itemTableHidden.removeClass('js-disabled');
    } else {
      itemTableHidden.addClass('js-disabled');
    }
  }); // выбор пункта select

  $('.b-reports-select--task select').on('change.select2', function (e) {
    $('.b-reports-select-list').slideUp();
    var selectedIndex = $(".b-reports-select--task select option:selected").index();
    $('.b-reports-select-list').eq(selectedIndex).slideDown();
  }); // кнопки prev - next 

  $('.b-reports-select__button').on('click', function (event) {
    event.preventDefault();
    var listSelect = $(".b-reports-select--task select");
    var listSelectLength = listSelect.find("option").length - 1;
    var listActiveIndex = listSelect.find("option:selected").index();
    var changeIndex = 0;

    if ($(this).hasClass('b-reports-select__button--next')) {
      changeIndex = listActiveIndex + 1;
    } else {
      changeIndex = listActiveIndex - 1;
    }

    if (changeIndex <= listSelectLength && changeIndex >= 0) {
      listSelect.find('option').eq(changeIndex).prop('selected', true);
      listSelect.trigger('change.select2');
    }
  }); //  стилизацияскролла в блоке со словами 

  if ($('.b-task-word__content-inner').length) {
    $('.b-task-word__content-inner').niceScroll({
      mousescrollstep: 10,
      cursorcolor: '#A2AEB7'
    });
  } // добавление слов в тз 


  $(document).on('click', '.b-task-word__content--list .b-task-word__item-title', function (event) {
    event.preventDefault();
    var thisTtext = $(this).find('span').html();
    var thisItem = $(this).closest('.b-task-word__item').clone(true);
    var wordTextarea = $('.b-task-word__content--selected textarea');
    var wordTextareaVal = wordTextarea.val();

    if ($(this).hasClass('js-selected')) {
      wordTextarea.val('');
      wordTextareaVal.split('\n').forEach(function (line, index) {
        if (line != thisTtext && line != "") {
          if (wordTextarea.val() != "") {
            wordTextarea.val(wordTextarea.val() + '\n' + line);
          } else {
            wordTextarea.val(line);
          }
        }
      });
    } else {
      wordTextarea.val(thisTtext + '\n' + wordTextarea.val());
    }

    $(this).toggleClass('js-selected');
  });
  /* вкладки слова */

  /*========================*/

  $('.b-task-tabs a').on('click', function (event) {
    event.preventDefault();

    if (!$(this).hasClass('js-active')) {
      $('.b-task-tabs a').removeClass('js-active');
      $('.b-task-tabs-block').slideUp();
      var activeItem = $(this).attr('href');
      $(this).addClass('js-active');
      $(activeItem).slideDown(function () {
        $(".b-task-word__content-inner").getNiceScroll().resize();
      });
    }
  }); // добавление тематических слов при первой загрузке

  if ($('.b-task-word').length) {
    var wordTextarea = $('.b-task-word__content--selected textarea');
    $('.js-selected').each(function (index, el) {
      if (wordTextarea.val() != "") {
        wordTextarea.val(wordTextarea.val() + '\n' + $(this).find('span').html());
      } else {
        wordTextarea.val($(this).find('span').html());
      }
    });
  } // добавление тематических слов при вводе в textarea


  $('.b-task-word__content--selected textarea').on('keyup', function (event) {
    var wordTextarea = $(this);
    var wordTextareaVal = wordTextarea.val().split('\n');
    $('.b-task-word__item-title').removeClass('js-selected');
    wordTextareaVal.forEach(function (line, index) {
      if (line != "") {
        $('.b-task-word__item-title').find('[data-text="' + line + '"]').closest('.b-task-word__item-title').addClass('js-selected');
      }
    });
  });
});

function validationForm(form) {
  var isNotFilled = true;
  var groupPages = false;
  form.find('input').each(function (index, el) {
    var formElement = $(this);
    var elementName = $(this).attr('name');
    var elementVal = formElement.val();
    var newPassword = formElement.closest('form').find('[name="newPassword"]').val();
    var emailPattern = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    var urlPattern = /.+?\..+/i; // авторизация

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

    if (elementName == "newPassword" && elementVal.length >= 1 && elementVal.length <= 5 || elementName == "password" && elementVal.length >= 1 && elementVal.length <= 5) {
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
    } //==========


    if (elementName == "add-text-title" && elementVal == "") {
      isNotFilled = false;
      showErrorMessage(formElement, 'Заполните поле Title');
    } // создавние новой задачи


    if (elementName == "challenge-name" && elementVal == "") {
      isNotFilled = false;
      showErrorMessage(formElement, 'Введите название задачи');
    }

    if (elementName == 'picking' && formElement.attr('id') == 'radio2' && formElement.is(':checked')) {
      groupPages = true;
    }
  });
  form.find('textarea').each(function (index, el) {
    var formElement = $(this);
    var elementName = $(this).attr('name');
    var elementVal = formElement.val();

    if (elementName == 'add-text' && tinyMCE.get('text-added').getContent() == "") {
      isNotFilled = false;
      formElement = formElement.prev('.mce-tinymce');
      showErrorMessage(formElement, 'Добавьте текст');
    }

    if (elementName == 'batch-upload' && elementVal == "") {
      isNotFilled = false;
      showErrorMessage(formElement, 'Добавьте ключевые слова');
    } else if (elementName == 'batch-upload') {
      $('[name="batch-upload"]').val().split('\n').forEach(function (el, i) {
        if (/\t/.test(el)) {
          el.split('\t').forEach(function (line, i) {
            if ($.trim(line).length <= 1 && line != '') {
              isNotFilled = false;
            }
          });
        } else if (el != "") {
          console.log('tut');
          isNotFilled = false;
        }
      });

      if (!isNotFilled) {
        showErrorMessage(formElement, 'Проверьте данные на соответствие шаблону');
      }
    } // создавние новой задачи 


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
          if (~line.indexOf('https://') || ~line.indexOf('http://')) {} else {
            isNotFilled = false;
            showErrorMessage(formElement, 'Добавьте URL конкурентов');
          }
        });
      }
    }
  });
  return isNotFilled;
} // Добавляет полю формы с ошибкой класс 'error' и сообщение об ошибке
// а также проверяет, если все поля заполнены верно - убирает класс и ошибку у кнопки формы


function showErrorMessage(element, errorMessage) {
  if (element.attr('type') == 'checkbox') {
    $(element).not('.error').addClass('error').next('label').after('<div class="error-text">' + errorMessage + '</div>');
  } else {
    $(element).not('.error').addClass('error').after('<div class="error-text">' + errorMessage + '</div>');
  }
}

; // Удаляет класс 'error' и сообщение об ошибке

function hideErrorMessage(element) {
  if (element.attr('type') == 'checkbox') {
    element.removeClass('error').next('label').next(".error-text").remove();
  } else {
    element.removeClass('error').next(".error-text").remove();
  }

  var elementForm = element.closest('form');

  if (!elementForm.find('.error:not(button)').length) {
    elementForm.find('button').removeClass('error').next(".error-text").remove();
  }
}

;