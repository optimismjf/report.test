$('form#calculator-popup').on('submit', function(event) {

    var formButton = $(this).find('button:not(.error):not([tabindex="-1"])');

    if (validationForm($(this))) {
        hideErrorMessage (formButton);
        alert('Заглушка');

    } else {

        showErrorMessage (formButton, 'Исправьте ошибки в полях формы');
        event.preventDefault();

    }


});