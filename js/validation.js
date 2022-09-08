let error = $('.error-text');

export function validate() {
    hideError();
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

    if (!(/^(0$|-?[1-9]\d*(\.\d*[1-9]$)?|-?0\.\d*[1-9])$/.test(valY))) {
        showError();
        error.text('Y должен задаваться числом!')
        return false;
    }
    if (!(parseInt(valY) >= MIN_Y && parseInt(valY) <= MAX_Y && (!/^-?5[.,][0]+[1-9]$/.test(valY)))) {
        showError();
        error.text('Y не входит в требуемый диапазон!')
        return false;
    }
    return true;
}

function validateR() {
    if ($('input[name=rval]').is(':checked')) {
        return true;
    }
    showError();
    error.text('Ошибка валидации R!')
    return false;
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