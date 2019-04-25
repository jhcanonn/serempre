<?php

namespace App\Controllers;

require_once "../../vendor/autoload.php";

use App\Models\{ClientModel, UserModel};

class ClientController {

	public function addClient($code, $name, $city) {
		return 'aura/session';
		// $user = UserModel::where('username', '=', $_SESSION['username'])->first();
		// $client = new ClientModel();
		// $client->code = $code;
		// $client->name = $name;
		// $client->user_id = $user->id;
		// $client->city_id = $city;
		// $client->save();
	}

}