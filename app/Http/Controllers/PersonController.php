<?php

namespace App\Http\Controllers;

use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PersonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $linked_users = Auth::user()->linked_users;
        $people = Auth::user()->people;
        return view('cabinet.people.index',compact('linked_users','people'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $success = Person::create([
               'user_id' => Auth::user()->id,
               'gender' => $request->gender,
               'full_name' => $request->full_name,
               'date_birth' => $request->date_birth,
            ]);
            if($success){
                session()->flash('success',__('other.Record successfully added'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('cabinet.people.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Person $person)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Person $person)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Person $person)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Person $person)
    {
        try {
            $success = $person->delete();
            if($success){
                session()->flash('success',__('other.The record was successfully deleted'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('cabinet.people.index');
    }
}
