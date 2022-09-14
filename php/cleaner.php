<?php
session_start();

$_SESSION['arr'] = array();

echo json_encode($_SESSION['arr']);