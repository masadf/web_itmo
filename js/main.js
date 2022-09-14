import {validate} from "./validation.js";
import {addNewRow, clearTable, fillTable} from "./front-view.js";

$("#values-form").submit((e) => {
    e.preventDefault();
    if (!validate()) return;

    $.ajax({
        url: "php/main.php",
        method: "GET",
        data: $("#values-form").serialize() + "&timezone=" + new Date().getTimezoneOffset(),
        dataType: "json",
        beforeSend: () => {
            setButtonDisabled(true);
        },
        success: (data) => {
            setButtonDisabled(false);
            addNewRow(data);
        }
    });
})

function setButtonDisabled(isDisabled){
    $("button[type=submit]").attr("disabled", isDisabled);
}

$("input[name=xval]").on("change", (e) => {
    let value = e.currentTarget.defaultValue;

    $("input[name=xval]").map((index, item) => {
        if (item.defaultValue !== value) {
            item.checked = false;
        }
    })
})

$(window).on("load", (e) => {
    $.ajax({
        url: "php/store.php",
        method: "GET",
        dataType: "json",
        success: (data) => {
            fillTable(data);
        }
    });
});

$("#remove_button").on("click", (e) => {
    $.ajax({
        url: "php/cleaner.php",
        method: "GET",
        dataType: "json",
        success: () => {
            clearTable();
        }
    });
})
