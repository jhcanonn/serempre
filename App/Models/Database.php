<?php

namespace App\Models;

use Illuminate\Database\Capsule\Manager as Capsule;

class Database {

	public function __construct() {
		$capsule = new Capsule;

		$capsule->addConnection([
		    'driver'    => 'mysql',
		    'host'      => 'localhost',
		    'database'  => 'serempre',
		    'username'  => 'root',
		    'password'  => 'root',
		    'charset'   => 'utf8',
		    'collation' => 'utf8_unicode_ci',
		    'prefix'    => '',
		]);

		// Make this Capsule instance available globally via static methods... (optional)
		$capsule->setAsGlobal();

		// Setup the Eloquent ORM... (optional; unless you've used setEventDispatcher())
		$capsule->bootEloquent();
	}

}