<?php

namespace App\Controllers;

session_start();

require_once "../../vendor/autoload.php";

use App\Models\{Database};
use App\Controllers\{UserController, ClientController};

new Database();

switch ($_POST['method']) {
	case 'singin':
		$user = new UserController();
		echo $user->verifyUser($_POST['username'], $_POST['password']);
		break;
	case 'singup':
		$user = new UserController();
		echo $user->registerUser($_POST['username'], $_POST['password']);
		break;
	case 'logout':
		session_destroy();
		break;
	case 'create_client':
		$client = new ClientController();
		echo $client->addClient($_POST['code'], $_POST['name'], $_POST['city']);
		break;
	
	default:
		# code...
		break;
}