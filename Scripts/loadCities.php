<?php

/** Error reporting */
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);

require_once "../vendor/autoload.php";

use Phpoffice\Phpexcel\Classes\PHPExcel;
use App\Models\{Database, CityModel};

new Database();

$file = "Cities.xlsx";
$inputFileType = PHPExcel_IOFactory::identify($file);
$objReader = PHPExcel_IOFactory::createReader($inputFileType);
$objPHPExcel = $objReader->load($file);
$sheet = $objPHPExcel->getSheet(0);

foreach ($sheet->getRowIterator() as $row) {
	$cityInfo = array();
	if($row->getRowIndex() == 1) {
		continue;
	}
	$cellIterator = $row->getCellIterator();
	$cellIterator->setIterateOnlyExistingCells(false); // Loop all cells, even if it is not set
	foreach ($cellIterator as $cell) {
		$cityInfo[] = $cell->getCalculatedValue();
		if(PHPExcel_Cell::columnIndexFromString($cell->getColumn()) == 2) {
			break;
		}
	}
	createCity($cityInfo);
}

function createCity($cityInfo) {
	$cityExist = CityModel::where('name', '=', $cityInfo[1])->first();
	if(!$cityExist) {
		$cm = new CityModel();
		$cm->code = $cityInfo[0];
		$cm->name = $cityInfo[1];
		$cm->save();
	}
}