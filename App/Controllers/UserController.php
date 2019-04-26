<?php

namespace App\Controllers;

session_start();

require_once "../../vendor/autoload.php";

use App\Models\{UserModel, CityModel};

class UserController {

	protected $msg = array('success' => false, 'msg' => '');

	public function verifyUser($username, $password) {
		$this->setSessionInfo();
		$user = UserModel::where('username', '=', $username)->first();
		if($user) {
			$verify = password_verify($password, $user->password);
			if($verify) {
				$this->msg['success'] = true;
				$this->msg['msg'] = "Credenciales correctas.";
			} else {
				$this->msg['msg'] = "Credenciales incorrectas.";
			}
		} else {
			$this->msg['msg'] = "Usuario no se encuentra registrado.";
		}
		return json_encode($this->msg);
	}

	public function registerUser($username, $password) {
		$this->setSessionInfo();
		$exist = UserModel::where('username', '=', $username)->count();
		if(!$exist) {
			$user = new UserModel();
			$user->username = $username;
			$user->password = password_hash($password, PASSWORD_DEFAULT);
			$user->save();
			$this->msg['success'] = true;
			$this->msg['msg'] = "Usuario registrado con éxito.";
		} else {
			$this->msg['msg'] = "Usuario ya se encuentra registrado.";
		}
		return json_encode($this->msg);
	}

	private function setSessionInfo() {
		$_SESSION['page'] = 'clients.twig';
		$_SESSION['data'] = array('title' => 'Client', 'cities' => CityModel::all()->toArray());
	}

}