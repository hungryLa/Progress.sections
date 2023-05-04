<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CabinetController extends Controller
{
    public function main(){
        if(Auth::user()->hasRole(User::ROLES['admin'])){
            return redirect()->route('school.index');
        }
        elseif (Auth::user()->hasRole(User::ROLES['schools_owner'])){
            return redirect()->route('school.index');
        }
        return view('cabinet.index');
    }
}
