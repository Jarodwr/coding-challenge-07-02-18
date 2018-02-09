<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;


class ApiController extends Controller
{
    const APIPATH = "https://swapi.co/api/";

    //Getting a page of people
    public function getPageOfPeople(Request $request, $page) {
        $client = new \GuzzleHttp\Client();
        
        $page_of_people = array();

        $api_path = self::APIPATH."people/?page=".$page;
        $response = $client->request('GET', $api_path, []);
        $page_object = json_decode($response->getBody());

        $page_of_people = array_map(function ($element){
            return $element->{"name"};
        }, $page_object->{"results"});

        // return json_encode($page_of_people);
        return response()->json($page_of_people);
        // return response()->json("ASKjdhaskjdhasjkdh");
    }

    //Getting all people
    public function getAllPeople(Request $request) {
        $client = new \GuzzleHttp\Client();

        $all_people = array();

        $next_page = self::APIPATH."people/?page=1";    //Initial page
        while ($next_page != null) {
            $response = $client->request('GET', $next_page, []);
            $page_object = json_decode($response->getBody());

            $page_of_people = array_map(function ($element) use (&$all_people) {
                return $element->{"name"};
            }, $page_object->{"results"});

            //Append page of people
            $all_people = array_merge($all_people, $page_of_people);
            $next_page = $page_object->{"next"};
        }

        return response()->json($all_people);
    }

    //Getting info on specific people
    public function getPerson(Request $request, $id) {
        $client = new \GuzzleHttp\Client();

        $person = array();  //Storage for relevant information on person

        // Get the person's basic info
        $people_api_path = self::APIPATH.'people/'.$id;
        $response = $client->request('GET', $people_api_path, []);
        $people_obj = json_decode($response->getBody());

        $person["given_name"] = $people_obj->{"name"};
        $person["height"] = $people_obj->{"height"};
        $person["hair_color"] = $people_obj->{"hair_color"};
        $person["birth_year"] = $people_obj->{"birth_year"};

        //Get the homeworld's name
        $homeworld_api_path = $people_obj->{"homeworld"};
        $response = $client->request('GET', $homeworld_api_path, []);
        $homeworld_obj = json_decode($response->getBody());

        $person["homeworld_name"] = $homeworld_obj->{"name"};

        //Get all of the film's names
        $person["film_names"] = array_map(function ($element) use (&$client) {
            $response = $client->request('GET', $element,[]);
            $film_obj = json_decode($response->getBody());

            return $film_obj->{"title"};
        }, $people_obj->{"films"});

        return response()->json($person);
    }
}
