<?php
namespace App\SwapiWrapper;

class SwapiWrapper implements \App\SwapiWrapper\ApiWrapperInterface
{
    const APIPATH = "https://swapi.co/api/";

    public function getPerson($id)
    {
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

        return $person;
    }

    public function getAllPeople()
    {
        $client = new \GuzzleHttp\Client();
        $all_people = array();
        $next_page = self::APIPATH."people/?page=1";    //Initial page
        while ($next_page != null) {
            $response = $client->request('GET', $next_page, []);
            $page_object = json_decode($response->getBody());
            $all_people = array_merge($all_people, $page_object->{"results"});
            $next_page = $page_object->{"next"};
        }
        return $all_people;
    }
}
?>