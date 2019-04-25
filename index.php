<?php

require_once "vendor/autoload.php";

use App\Controllers\{ViewController};

if(!isset($_POST['page'])) {
	$_POST['page'] = 'login.twig';
	$_POST['data'] = array('title' => 'Login');
}

$view = new ViewController();
$renderedView = $view->rederView($_POST['page'], [
	'data' => $_POST['data']
]);
echo $renderedView;