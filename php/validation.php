<?php
function validateForm($xVal, $yVal, $rVal, $timezoneOffset)
{
    if(!(validateX($xVal) && validateY($yVal) && validateR($rVal) && validateTimezone($timezoneOffset))){
        http_response_code(403);
        echo "{" .
            "\"isValid\":false," .
            "\"message\":\"Ошибка валидации!\"" .
            "}";
        exit;
    }
}

function validateX($xVal)
{
    return is_numeric($xVal);
}

function validateY($yVal)
{
    $Y_MIN = -5;
    $Y_MAX = 5;

    $numY = str_replace(",", ".", $yVal);
    if (!is_numeric($numY))
        return false;

    return $numY >= $Y_MIN && $numY <= $Y_MAX;
}

function validateR($rVal)
{
    return is_numeric($rVal);
}

function validateTimezone($timezoneOffset)
{
    return is_numeric($timezoneOffset);
}

function getQueryParam($key){
    if (!isset($_GET[$key])) {
        http_response_code(403);
        echo "{" .
            "\"isValid\":false," .
            "\"message\":\"Не хватает аргументов!\"" .
            "}";
        exit;
    }

    return str_replace(",", ".", $_GET[$key]);
}


