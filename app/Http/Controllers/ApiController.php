<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;

class ApiController extends Controller
{

    private $apiWrapper;

    public function __construct()
    {
        $this->apiWrapper = new \App\SwapiWrapper\SwapiWrapper();
    }
    
    //Getting a page of people
    public function getPageOfPeople(Request $request, $page) 
    {
        $page_object = $this->apiWrapper->getPageOfPeople($page);
        $page_of_people = $this->parseListOfPeople($page_object->{"results"});
        return response()->json($page_of_people);
    }

    //Getting all people
    public function getAllPeople(Request $request) 
    {
        $all_people = $this->parseListOfPeople($this->apiWrapper->getAllPeople());
        return response()->json($all_people);
    }

    //Getting info on specific people
    public function getPerson(Request $request, $id) 
    {
        $person = $this->apiWrapper->getPerson($id);
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
}
