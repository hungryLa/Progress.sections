<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PersonRecource;
use App\Http\Resources\User\UserResource;
use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PersonController extends Controller
{
    public function index()
    {
        $data['linked_users'] = UserResource::collection(Auth::user()->linked_users);
        $data['people'] = PersonRecource::collection(Auth::user()->people);
        return $data;
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
            if ($success) {
                session()->flash('success', __('other.Record successfully added'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Person $person)
    {
        try {
            $success = $person->delete();
            if ($success) {
                session()->flash('success', __('other.The record was successfully deleted'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }
}
