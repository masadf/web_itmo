<?php
function checkHit($xVal, $yVal, $rVal)
{
    return checkTriangle($xVal, $yVal, $rVal) || checkRectangle($xVal, $yVal, $rVal) ||
        checkCircle($xVal, $yVal, $rVal);
}

function checkTriangle($xVal, $yVal, $rVal)
{
    return $xVal >= 0 && $yVal >= 0 &&
        $yVal <= -$xVal + $rVal / 2;
}

function checkRectangle($xVal, $yVal, $rVal)
{
    return $xVal <= 0 && $yVal <= 0 &&
        $xVal >= -$rVal / 2 && $yVal >= -$rVal;
}

function checkCircle($xVal, $yVal, $rVal)
{
    return $xVal >= 0 && $yVal <= 0 &&
        sqrt($xVal * $xVal + $yVal * $yVal) <= $rVal / 2;
}
