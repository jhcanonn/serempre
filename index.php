<?php

session_start();

require_once "vendor/autoload.php";

use App\Controllers\{ViewController};

if(!isset($_SESSION['page']) || !isset($_SESSION['data'])) {
	$_SESSION['page'] = 'login.twig';
	$_SESSION['data'] = array('title' => 'Login');
}

$view = new ViewController();
$renderedView = $view->rederView($_SESSION['page'], [
	'data' => $_SESSION['data']
]);
echo $renderedView;