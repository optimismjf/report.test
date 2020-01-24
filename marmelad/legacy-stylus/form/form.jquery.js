
$('input[type=tel]').attr('placeholder', '+7 (___) ___ - __ - __').mask("+7 (999) 999 - 99 - 99");


$('form:not(.no-validate)').on('submit', function(event) {

    var formButton = $(this).find('button:not(.error):not([tabindex="-1"])');

    if (validationForm($(this))) {
        hideErrorMessage (formButton);

        if ($(this).hasClass('b-authorization__item b-authorization__item--restore-password')) {
            event.preventDefault();
            $('.b-authorization__content').slideUp();
            $('#password-sent').slideDown();
        }

        if ($(this).hasClass('b-challenge-popup__form--add-text')) {

            event.preventDefault();

            var openButton      = $('.b-challenge__text-add-button.js-opened');
            var hisTitle        = $(this).find('[name="add-text-title"]').val();
            var hisContent      = tinyMCE.get('text-added').getContent();

            openButton.addClass('hide');

            if ($('.b-his.js-opened').length) {
                console.log('editor');
                $('.b-his.js-opened').find('.b-his__title').html(hisTitle);
                $('.b-his.js-opened').find('.b-his__content').html(hisContent);
            } else {
                console.log('new');
                openButton.after('<div class="b-his"><a class="b-his__title" href="#add-text">'+hisTitle+'</a><a class="b-his__delete" href="#"><img src="images/icon/recycle.svg" title="Удалить" alt="Удалить"/></a><div class="b-his__content hide">'+hisContent+'</div></div>')
            }
            closeEditor();

        }

        if ($(this).hasClass('b-challenge-popup__form--batch-upload')) {
            event.preventDefault();

            var batchUpload     = $(this).find('[name="batch-upload"]').val().split('\n');
            var groupCounter    = 0;

            batchUpload.forEach(function (line, index) {
                if (index == 0) {
                    $('.b-challenge__group').remove();
                }
                if (line != "") {
                    addingGroup(line);
                    groupLength();
                    wordLength();
                }
            });
            // проверяем поля и удаляем ключевое слово 'группа'
            $('[name="add-url"]').each(function(index, el) {
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

        showErrorMessage (formButton, 'Исправьте ошибки в полях формы');
        event.preventDefault();

    }


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

$(document).on('keyup', 'input', function(event) {

    var element = $(this);

    if ($(this).hasClass('error')) {
    
        var elementType    = element.attr('type');

        if ((elementType == 'password' && element.val().length > 5) || (elementType != 'password' && element.val() != "")) {

            hideErrorMessage(element);
            
        }

    }
    
});

$(document).on('change', 'input[type="checkbox"]', function(event) {

    var element = $(this);
    if ($(this).hasClass('error')) {
        hideErrorMessage(element);
    }
    
});



$(document).on('keyup', 'textarea', function(event) {

    var element = $(this);

    if ($(this).hasClass('error') && element.val() != "") {
        hideErrorMessage(element);
    }
    if (element.attr('name') == 'group-list') {
        wordLength();
    }
    
});