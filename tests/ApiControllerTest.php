<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class ApiControllerTest extends TestCase
{
    private $api_controller;
    public function setUp() {
        $test_data = file_get_contents(getcwd()."\\tests\TestData.json");
        $this->api_controller = new \App\Http\Controllers\ApiController();
        $this->api_controller->changeWrapper(new \App\SwapiWrapper\TestWrapper($test_data));
    }

    //Get person that exists
    public function testGetPerson1()
    {
        $person = $this->api_controller->getPerson(new \Illuminate\Http\Request(), 1);
        $this->assertEquals(
            $person->content(), 
            "{\"given_name\":\"Luke Skywalker\",\"height\":\"172\",\"hair_color\":\"blond\",\"birth_year\":\"19BBY\",\"homeworld_name\":\"Tatooine\",\"film_names\":[\"The Empire Strikes Back\",\"Revenge of the Sith\",\"Return of the Jedi\",\"A New Hope\",\"The Force Awakens\"]}"
        );
    }

    //Get person that exists
    public function testGetPerson2() {
        $person = $this->api_controller->getPerson(new \Illuminate\Http\Request(), 2);
        $this->assertEquals(
            $person->content(),
            "{\"given_name\":\"C-3PO\",\"height\":\"167\",\"hair_color\":\"n\/a\",\"birth_year\":\"112BBY\",\"homeworld_name\":\"Tatooine\",\"film_names\":[\"The Empire Strikes Back\",\"Attack of the Clones\",\"The Phantom Menace\",\"Revenge of the Sith\",\"Return of the Jedi\",\"A New Hope\"]}"
        );
    }

    //Get person that exists
    public function testGetPerson3() {
        $person = $this->api_controller->getPerson(new \Illuminate\Http\Request(), 3);
        $this->assertEquals(
            $person->content(),
            "{\"given_name\":\"R2-D2\",\"height\":\"96\",\"hair_color\":\"n\/a\",\"birth_year\":\"33BBY\",\"homeworld_name\":\"Naboo\",\"film_names\":[\"The Empire Strikes Back\",\"Attack of the Clones\",\"The Phantom Menace\",\"Revenge of the Sith\",\"Return of the Jedi\",\"A New Hope\",\"The Force Awakens\"]}"
        );
    }

    //Get person that doesn't exist
    public function testGetPerson4() {
        $person = $this->api_controller->getPerson(new \Illuminate\Http\Request(), 5);
        $this->assertEquals(
            $person->content(),
            "{}"
        );
    }

    //Get person that doesn't exist
    public function testGetPerson5() {
        $person = $this->api_controller->getPerson(new \Illuminate\Http\Request(), 0);
        $this->assertEquals(
            $person->content(),
            "{}"
        );
    }

    public function testGetAllPeople() {
        $person = $this->api_controller->getAllPeople(new \Illuminate\Http\Request());
        $this->assertEquals(
            $person->content(),
            "[{\"id\":\"1\",\"given_name\":\"Luke Skywalker\"},{\"id\":\"2\",\"given_name\":\"C-3PO\"},{\"id\":\"3\",\"given_name\":\"R2-D2\"},{\"id\":\"4\",\"given_name\":\"Darth Vader\"}]"
        );
    }
}
