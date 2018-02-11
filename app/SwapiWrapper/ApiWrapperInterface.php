<?php
namespace App\SwapiWrapper;

interface ApiWrapperInterface 
{
    public function getPerson($id);
    public function getPageOfPeople($page);
    public function getAllPeople();
}
?>