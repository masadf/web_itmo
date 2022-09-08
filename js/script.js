import {validate} from "./validation.js";

$('#values-form').submit((e) => {
    e.preventDefault();
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
            let newRow;
            newRow = '<tr>';
            newRow += '<td>' + data.xVal + '</td>';
            newRow += '<td>' + data.yVal + '</td>';
            newRow += '<td>' + data.rVal + '</td>';
            newRow += '<td>' + data.currentTime + '</td>';
            newRow += '<td>' + data.executionTime + '</td>';
            newRow += '<td>' + data.isHit + '</td>';
            newRow += '</tr>';
            $('table').append(newRow);
        }
    });
})

$('input[name=xval]').on('change', (e) => {
    let value = e.currentTarget.defaultValue;
    $('input[name=xval]').map((index, item) => {
        if (item.defaultValue !== value) {
            item.checked = false;
        }
    })
})

$(window).on('load', (e) => {
    $.ajax({
        url: 'php/store.php',
        method: 'GET',
        dataType: "json",
        success: (data) => {
            data.forEach((value, index) => {
                let newRow;
                newRow = '<tr>';
                newRow += '<td>' + value.xVal + '</td>';
                newRow += '<td>' + value.yVal + '</td>';
                newRow += '<td>' + value.rVal + '</td>';
                newRow += '<td>' + value.currentTime + '</td>';
                newRow += '<td>' + value.executionTime + '</td>';
                newRow += '<td>' + value.isHit + '</td>';
                newRow += '</tr>';
                $('table').append(newRow);
            })
        }
    });
});

$('#remove_button').on('click', (e) => {
    $.ajax({
        url: 'php/restore.php',
        method: 'GET',
        dataType: "json",
        success: (data) => {
            $('table').empty();
            let newRow;
            newRow = '<tr>';
            newRow += '<th>' + 'X' + '</th>';
            newRow += '<th>' + 'Y' + '</th>';
            newRow += '<th>' + 'R' + '</th>';
            newRow += '<th>' + 'Время попытки' + '</th>';
            newRow += '<th>' + 'Длительность' + '</th>';
            newRow += '<th>' + 'Попадание' + '</th>';
            newRow += '</tr>';
            $('table').append(newRow);
        }
    });
})