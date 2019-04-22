<?php

namespace App\Controllers;

require_once "../../vendor/autoload.php";

use App\Models\{Database};
use App\Controllers\{UserController};

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
	
	default:
		# code...
		break;
}