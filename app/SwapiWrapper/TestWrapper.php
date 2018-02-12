<?php
namespace App\SwapiWrapper;

class TestWrapper implements \App\SwapiWrapper\ApiWrapperInterface 
{
    private $people;
    private $all_people;

    public function __construct($test_json) {
		$decoded = json_decode($test_json);
		$this->people = $decoded->{"people"};
		$this->all_people = $decoded->{"all_people"};
    }

    public function getPerson($id) {
		if (array_key_exists($id-1, $this->people)) {
			return ($this->people)[$id-1];
		} else {
			return null;
		}
    }
    public function getAllPeople() {
        return $this->all_people;
    }
}
?>