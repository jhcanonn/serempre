<?php

namespace App\Controllers;

use \Twig\Loader\FilesystemLoader;
use \Twig\Environment;

class ViewController {

	protected $loader;
	protected $twig;

	public function __construct() {
		$this->loader = new FilesystemLoader('App/Views');
		$this->twig = new Environment($this->loader);
	}

	public function rederView($viewName, $data) {
		return $this->twig->render($viewName, $data);
	}

}