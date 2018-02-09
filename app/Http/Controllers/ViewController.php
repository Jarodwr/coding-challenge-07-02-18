<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

class ViewController extends Controller
{
    public function main(Request $request) {
        return view('main');
    }
}
