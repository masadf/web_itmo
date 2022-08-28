$(() => {
    let error = $('.error-text');

    function validate() {
        return validateX() & validateY() & validateR();
    }

    function validateX() {
        if ($('input[name=xval]').is(':checked')) {
            return true;
        }
        showError();
        error.text('Ошибка валидации X!')
        return false;
    }

    function validateY() {
        const MAX_Y = 5;
        const MIN_Y = -5;

        let valY = $('input[name=yval]').val().replace(',', '.');

        if (isNum(valY) && valY >= MIN_Y && valY <= MAX_Y) {
            return true;
        }
        showError();
        error.text('Ошибка валидации Y!')
        return false;
    }

    function validateR() {
        if ($('input[name=rval]').is(':checked')) {
            return true;
        }
        showError();
        error.text('Ошибка валидации R!')
        return false;
    }

    function isNum(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function showError() {
        error.css({
            display: 'block'
        })
    }

    function hideError() {
        error.css({
            display: 'none'
        })
    }

    $('#values-form').submit((e) => {
        e.preventDefault();
        hideError();
        if (!validate()) return;
        $.ajax({
            url: 'php/main.php',
            method: 'GET',
            data: $('#values-form').serialize() + '&timezone=' + new Date().getTimezoneOffset(),
            dataType: "json",
            beforeSend: () => {
                $('button[type=submit]').attr('disabled', 'disabled');
            },
            success: (data) => {
                $('button[type=submit]').attr('disabled', false);
                if (data.isValid) {
                    newRow = '<tr>';
                    newRow += '<td>' + data.xVal + '</td>';
                    newRow += '<td>' + data.yVal + '</td>';
                    newRow += '<td>' + data.rVal + '</td>';
                    newRow += '<td>' + data.currentTime + '</td>';
                    newRow += '<td>' + data.executionTime + '</td>';
                    newRow += '<td>' + data.isHit + '</td>';
                    newRow += '</tr>';
                    $('table').append(newRow);
                } else {
                    error.text("Ошибка валидации!");
                    showError();
                }
            }
        });
    })
})