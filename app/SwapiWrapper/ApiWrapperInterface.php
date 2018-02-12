<?php
namespace App\SwapiWrapper;

interface ApiWrapperInterface 
{
    public function getPerson($id);
    public function getAllPeople();
}
?>