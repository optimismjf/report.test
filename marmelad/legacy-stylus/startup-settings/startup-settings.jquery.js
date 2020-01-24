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


function autostartDate () {

	var period 		= $('.b-settings-autostart__select--period select option:selected').val();
	var week 		= '.b-settings-autostart__select--week';
	var month 		= '.b-settings-autostart__select--month';
	var weekIndex   = $(week).find('select option:selected').val();
	var monthIndex  = $(month).find('select option:selected').val();
	var date		= new Date();
	var dayIndex	= date.getDay();
	var days		= ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

	// Определяем сегодняшнее число в формате dd.mm.yy
	var dd = date.getDate();
	var mm = date.getMonth() + 1;
	var yy = date.getFullYear() % 100;

	// вычисляем сколько дней в месяце
	var daysInMonth = new Date(yy, mm, 0);
	daysInMonth = daysInMonth.getDate();

	// вычисляем сколько дней в следующем месяце
	var daysNextMonth = new Date(yy, mm+1, 0);
	daysNextMonth = daysNextMonth.getDate();

	// изменение даты автозапуска относительно выбранного периода
	if (period == 'День') {

		$(week+', '+month).fadeOut();
		dd = dd + 1;

		necessarytest(daysInMonth, dd, mm, yy);

	} else if (period == 'Неделя') {

		$(week).fadeIn();
		$(month).hide();
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

		necessarytest(daysInMonth, dd, mm, yy);

	} else if (period == 'Месяц') {

		$(month).fadeIn();
		$(week).hide();

		mm = mm + 1;
		if (monthIndex > daysNextMonth) {
			dd = daysNextMonth;
		} else {
			dd = monthIndex;
		}

		necessarytest(daysInMonth, dd, mm, yy);
	}

	
};

function necessarytest (daysInMonth, dd, mm, yy) {
	
	if (daysInMonth < dd) {
		dd = dd - daysInMonth;
		mm = mm + 1;
	}

	if (mm > 12) {
		mm = 1;
		yy = yy + 1;
	};

	if (dd < 10) {dd = '0' + dd;}
	if (mm < 10) { mm = '0' + mm;}

	$('.autostart-date').html(dd + '.' + mm + '.' + yy);
}

autostartDate();