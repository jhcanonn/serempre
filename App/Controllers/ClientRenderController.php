<?php

namespace App\Controllers;

require_once "../../vendor/autoload.php";

use \Twig\Loader\FilesystemLoader;
use \Twig\Environment;

$loader = new FilesystemLoader('App/Views');
$twig = new Environment($loader);
$twig->render('clients.twig', [
	'title' => 'Clients'
]);