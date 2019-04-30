<?php

namespace App\Controllers;

session_start();

require_once "../../vendor/autoload.php";

use App\Models\{ClientModel, UserModel};
use Illuminate\Database\Capsule\Manager as DB;

class ClientController {

	protected $msg = array('success' => true, 'update' => false, 'msg' => '');

	public function createClient($code, $name, $city) {
		$user = UserModel::where('username', '=', $_SESSION['username'])->first();
		if($user) {
			$client = new ClientModel();
			$client->code = $code;
			$client->name = $name;
			$client->user_id = $user->id;
			$client->city_id = $city;
			$client->save();
			$this->refreshClientsOnSession($user->id);
			$this->msg['msg'] = 'Added successfully';
			$this->msg['clientId'] = $client->id;
		}
		return json_encode($this->msg);
	}

	public function updateClient($clientId, $code, $name, $city) {
		$user = UserModel::where('username', '=', $_SESSION['username'])->first();
		if($user) {
			$client = ClientModel::find($clientId);
			if($client) {
				$client->code = $code;
				$client->name = $name;
				$client->user_id = $user->id;
				$client->city_id = $city;
				$client->save();
				$this->refreshClientsOnSession($user->id);
				$this->msg['update'] = true;
				$this->msg['msg'] = 'Edited successfully';
				$this->msg['clientId'] = $client->id;
			}
		}
		return json_encode($this->msg);
	}

	public function deleteClient($clientId) {
		$user = UserModel::where('username', '=', $_SESSION['username'])->first();
		if($user) {
			$client = ClientModel::find($clientId);
			if($client) {
				$client->delete();
				$this->refreshClientsOnSession($user->id);
				$this->msg['msg'] = 'Deleted successfully';
			}
		}
		return json_encode($this->msg);
	}

	private function refreshClientsOnSession($userId) {
		$_SESSION['data']['clients'] = DB::table('clients')
										->select('clients.id', 'clients.code','clients.name as name_client','cities.name as name_city','cities.id as city_id')
										->join('cities','cities.id','=','clients.city_id')
										->where('clients.user_id', '=', $userId)
										->get()->toArray();
	}

}