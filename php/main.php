<?php
require_once("validation.php");
require_once("hitChecker.php");

session_start();

$xVal = getQueryParam("xval");
$yVal = getQueryParam("yval");
$rVal = getQueryParam("rval");
$timezoneOffset = getQueryParam("timezone");

validateForm($xVal, $yVal, $rVal, $timezoneOffset);

$xVal = (double)$xVal;
$yVal = (double)$yVal;
$rVal = (double)$rVal;
$isHit = checkHit($xVal, $yVal, $rVal) ? "true" : "false";
$currentTime = date("H:i:s", time() - $timezoneOffset * 60);
$executionTime = round(microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"], 7);

$jsonData = "{" .
    "\"isValid\":true," .
    "\"xVal\":\"$xVal\"," .
    "\"yVal\":\"$yVal\"," .
    "\"rVal\":\"$rVal\"," .
    "\"currentTime\":\"$currentTime\"," .
    "\"executionTime\":\"$executionTime\"," .
    "\"isHit\":$isHit" .
    "}";

$_SESSION["arr"][] = json_decode($jsonData);

echo $jsonData;