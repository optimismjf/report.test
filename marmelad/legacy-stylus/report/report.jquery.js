$('.b-analysis-name__search input').keyup(function(event) {

	var searchText 		= $(this).val();
	var projectItem		= '.b-analysis-name__item';
	var projectItemWrap	= '.b-analysis-name__body';

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

			$('.b-analysis-name__sitename a').each(function(index, el) {

				var item 		= $(this).closest(projectItem);
				var itemName 	= $(this).text();
				if (itemName.indexOf(searchText)>=0) {
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
});