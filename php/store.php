<?php
session_start();
if (!isset($_SESSION['arr'])) {
    $_SESSION['arr'] = array();
}

echo json_encode($_SESSION['arr']);
