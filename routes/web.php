<?php
// use App\Http\Controllers\ApiController; 
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->group(['prefix' => '/api'], function() use ($router) {
    $router->group(['prefix' => '/people'], function() use ($router) {
        $router->group(['prefix' => '/all'], function() use ($router) {
            $router->get('/', 'ApiController@getAllPeople'); 
            $router->get('/{page}', 'ApiController@getPageOfPeople');
        });
        $router->get('/{id}', 'ApiController@getPerson');
    });
});

$router->get('/', 'ViewController@main');