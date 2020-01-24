$('.b-projects__search input').keyup(function(event) {

	var searchText 		= $(this).val();
	var projectItem		= '.b-projects-table__line';
	var projectItemWrap	= '.b-projects-table__content';
	var pagePagination	= '.b-page-nav';

	$(projectItem).removeClass('js-search');

	if (searchText.length >= 2) {

		if ($('.b-page-nav').length > 0) {

			alert("ajax");
			$(projectItemWrap+','+pagePagination).addClass('js-blocking');
			$(projectItemWrap).prepend('<div class="block-preloader"><span></span><span></span><span></span></div>');

			setTimeout(function () {
				$(projectItemWrap+','+pagePagination).removeClass('js-blocking');
				$(projectItemWrap).find('.block-preloader').remove();
			}, 3000);


		} else {

			$('.b-projects-table__link a span').each(function(index, el) {

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

	} else if (searchText.length == 0 && $('.b-page-nav').length <= 0) {
		$(projectItem).fadeIn();
	}
});