$(function() {
    var $textTitle = $('.intro-title');
    setTimeout( function() {
        $textTitle.fadeTo(750, 1);
    }, 450)

});


$(function() {
    var $textMain = $('.intro-text-wrapper > p');
    setTimeout( function() {
        $textMain.eq(0).css ({
            "transform": "translateX(0)",
            "opacity": "1"
        });
    }, 500);

    setTimeout( function () {
        $textMain.eq(1).css ({
            "transform": "translateX(0)",
            "opacity": "1"
        });
    }, 1000);
        

    setTimeout( function () {
        $textMain.eq(2).css ({
            "transform": "translateX(0)",
            "opacity": "1"
        });
    }, 1500);
    
});

$(function() {
    const $options = $('.contacts-select > option');
    const $selectBtn = $('.contacts-select');
    
    $selectBtn.on('click', function () {
        $options.slideDown(1000);
    }, 500);


});




$(function() {

    // Маска для телефона
    $('#phone').on('input', function() {
        let value = $(this).val().replace(/\D/g, '');
        
        if (value.length === 0) {
            $(this).val('');
        } else if (value.length === 1) {
            $(this).val('+7 (9' + value);
        } else if (value.length <= 4) {
            $(this).val('+7 (' + value.substring(1, 4));
        } else if (value.length <= 7) {
            $(this).val('+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7));
        } else if (value.length <= 9) {
            $(this).val('+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9));
        } else {
            $(this).val('+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9) + '-' + value.substring(9, 11));
        }
    });
    
    $('#phone').on('focus', function() {
        if ($(this).val() === '') {
            $(this).val('+7 (9');
        }
    });
    
    // Обработка отправки формы
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Валидация формы
        if (validateForm()) {
            sendFormData($(this));
        }
    });


    // Функция валидации формы
    function validateForm() {
        let isValid = true;
        const $form = $('#contactForm');
        
        // Сбрасываем предыдущие ошибки
        $form.find('.error').remove();
        $form.find('input').removeClass('error-border');
        
        // Проверка имени
        if (!$form.find('input[name="first_name"]').val().trim()) {
            showError('input[name="first_name"]', 'Введите имя');
            isValid = false;
        }
        
        // Проверка фамилии
        if (!$form.find('input[name="last_name"]').val().trim()) {
            showError('input[name="last_name"]', 'Введите фамилию');
            isValid = false;
        }
        
        // Проверка email
        const email = $form.find('input[name="email"]').val();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('input[name="email"]', 'Введите корректный email');
            isValid = false;
        }
        
        // Проверка телефона
        const phone = $form.find('input[name="phone"]').val();
        if (phone.replace(/\D/g, '').length !== 11) {
            showError('input[name="phone"]', 'Введите корректный номер телефона');
            isValid = false;
        }
        
        return isValid;
    }

    // Функция показа ошибки
    function showError(selector, message) {
        const $input = $(selector);
        $input.addClass('error-border');
        $input.after('<div class="error" style="color:red; font-size:12px; margin-top:5px;">' + message + '</div>');
    }

    // Функция отправки данных
    function sendFormData($form) {
        const $button = $form.find('button[type="submit"]');
        const $message = $('#formMessage');
        
        // Блокируем кнопку
        $button.prop('disabled', true).text('Отправка...');
        $message.hide();
        
        // Собираем данные формы
        const formData = {
            first_name: $form.find('input[name="first_name"]').val(),
            last_name: $form.find('input[name="last_name"]').val(),
            email: $form.find('input[name="email"]').val(),
            phone: $form.find('input[name="phone"]').val(),
            tariff: $form.find('select[name="tariff"]').val()
        };
        
        // Отправка AJAX запроса
        $.ajax({
            type: 'POST',
            url: 'send_email.php', // Укажите путь к вашему PHP скрипту
            data: formData,
            success: function(response) {
                $message.removeClass('error success').addClass('success');
                $message.html('Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.').show();
                $form[0].reset(); // Очищаем форму
            },
            error: function() {
                $message.removeClass('error success').addClass('error');
                $message.html('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.').show();
            },
            complete: function() {
                $button.prop('disabled', false).text('Отправить');
            }
        });
    };
}); 


$(function() {
    // Добавляем классы элементам
    $('h2').addClass('scroll-fade-up');
    /* $('p').addClass('scroll-slide-left'); */

    function checkVisibility() {
        var windowHeight = $(window).height();
        var scrollPosition = $(window).scrollTop();

        // Анимация для элементов с классом scroll-fade-up
        $('.scroll-fade-up').each(function(index) {
            var $element = $(this);
            var elementTop = $element.offset().top;

            if (scrollPosition > elementTop - windowHeight + 100) {
                setTimeout(function() {
                    $element.css({
                        'opacity': '1',
                        'transform': 'translateY(0)'
                    });
                }, index * 100);
            } else {
                setTimeout(function() {
                    $element.css({
                        'opacity': '0',
                        'transform': 'translateY(30px)'
                    });
                }, index * 50);
            }
        });

        // Анимация для элементов с классом scroll-slide-left
        $('.scroll-slide-left').each(function(index) {
            var $element = $(this);
            var elementTop = $element.offset().top;

            if (scrollPosition > elementTop - windowHeight + 100) {
                setTimeout(function() {
                    $element.css({
                        'opacity': '1',
                        'transform': 'translateX(0)'
                    });
                }, index * 100);
            } else {
                setTimeout(function() {
                    $element.css({
                        'opacity': '0',
                        'transform': 'translateX(-50px)'
                    });
                }, index * 50);
            }
        });

        // Анимация для элементов с классом scroll-slide-left
        $('.slide-inBig').each(function(index) {
            var $element = $(this);
            var elementTop = $element.offset().top;

            if (scrollPosition > elementTop - windowHeight + 70) {
                setTimeout(function() {
                    $element.css({
                        'opacity': '1',
                        'transform': 'scale(1)'
                    });
                }, index * 100);
            } else {
                setTimeout(function() {
                    $element.css({
                        'opacity': '0',
                        'transform': 'scale(0)'
                    });
                }, index * 50);
            }
        });

    }

    $(window).on('scroll', function() {
        checkVisibility();
    });

    checkVisibility();
});