<?php

require_once "vendor/autoload.php";

use App\Controllers\{ViewController};

// var_dump($_POST);
if(!isset($_POST['page'])) {
	$_POST['page'] = 'login.twig';
	$_POST['title'] = 'Login';
}

$view = new ViewController();
$renderedView = $view->rederView($_POST['page'], [
	'title' => $_POST['title']
]);
echo $renderedView;