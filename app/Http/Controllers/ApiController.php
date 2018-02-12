<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    private $api_wrapper;

    public function __construct()
    {
        $this->api_wrapper = new \App\SwapiWrapper\SwapiWrapper();
    }

    //Getting all people
    public function getAllPeople(Request $request) 
    {
        $all_people = $this->parseListOfPeople($this->api_wrapper->getAllPeople());
        return response()->json($all_people);
    }

    //Getting info on specific people
    public function getPerson(Request $request, $id) 
    {
        $person = $this->api_wrapper->getPerson($id);
        return response()->json($person);
    }

    private function parseListOfPeople($list) 
    {
        return array_map(function ($element) 
        {
            $person = array();
            $explodedUrl = explode("/", $element->{"url"});
            $person["id"] = $explodedUrl[count($explodedUrl)-2];
            $person["given_name"] = $element->{"name"};
            return $person;
        }, 
        $list);
    }

    public function changeWrapper($wrapper) {
        $this->api_wrapper = $wrapper;
    }
}
