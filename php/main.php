<?php

function validateX($xVal) {
  return is_numeric($xVal);
}

function validateY($yVal) {
  $Y_MIN = -5;
  $Y_MAX = 5;

  $numY = str_replace(',', '.', $yVal);
  if (!is_numeric($numY))
    return false;

  return is_numeric($numY) && $numY >= $Y_MIN && $numY <= $Y_MAX;
}

function validateR($rVal) {
  return is_numeric($rVal);
}

function validateForm($xVal, $yVal, $rVal) {
  return validateX($xVal) && validateY($yVal) && validateR($rVal);
}

function checkTriangle($xVal, $yVal, $rVal) {
  return $xVal >= 0 && $yVal >= 0 &&
    $yVal <= -$xVal + $rVal/2;
}

function checkRectangle($xVal, $yVal, $rVal) {
  return $xVal <= 0 && $yVal <= 0 &&
    $xVal >= -$rVal/2 && $yVal >= -$rVal;
}

function checkCircle($xVal, $yVal, $rVal) {
  return $xVal >= 0 && $yVal <= 0 &&
    sqrt($xVal*$xVal + $yVal*$yVal) <= $rVal/2;
}

function checkHit($xVal, $yVal, $rVal) {
  return checkTriangle($xVal, $yVal, $rVal) || checkRectangle($xVal, $yVal, $rVal) ||
    checkCircle($xVal, $yVal, $rVal);
}

$xVal= $_GET['xval'];
$yVal= $_GET['yval'];
$rVal= $_GET['rval'];
$timezoneOffset = $_GET['timezone'];

$isValid = validateForm($xVal, $yVal, $rVal);
$converted_isValid = $isValid ? 'true' : 'false';
$isHit = $isValid ? checkHit($xVal, $yVal, $rVal) : False;
$converted_isHit= $isHit ? 'true' : 'false';

$currentTime = date('H:i:s', time()-$timezoneOffset*60);
$executionTime = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);

$jsonData = '{' .
  "\"isValid\":$converted_isValid," .
  "\"xVal\":\"$xVal\"," .
  "\"yVal\":\"$yVal\"," .
  "\"rVal\":\"$rVal\"," .
  "\"currentTime\":\"$currentTime\"," .
  "\"executionTime\":\"$executionTime\"," .
  "\"isHit\":$converted_isHit" .
  "}";

echo $jsonData;