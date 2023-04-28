<?php

namespace App\Http\Controllers;

use App\Http\Requests\School\StoreRequest;
use App\Http\Requests\School\UpdateRequest;
use App\Models\File;
use App\Models\ModelSchool;
use App\Models\School;
use App\Models\User;
use Doctrine\DBAL\Driver\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SchoolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        if($user->hasRole(User::ROLES['admin'])){
            $schools = School::orderBy('id')->get();
        }
        elseif ($user->hasRole(User::ROLES['schools_owner'])){
            $schools = $user->schools()->orderBy('id')->get();
        }
        elseif ($user->hasRole(User::ROLES['teacher'])){
            $schools = $user->schools()->orderBy('id')->get();
        }
        elseif ($user->hasRole(User::ROLES['user'])){
            $schools = School::where('status',School::STATUS['active'])->orderBy('id')->get();
        }
        else{
            $schools = School::where('status',School::STATUS['active'])->orderBy('id')->get();
        }
        return view('cabinet.schools.index',compact('schools'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('cabinet.schools.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        try {
            $school = School::create([
                'status' => $request->status,
                'type' => $request->type,
                'title' => $request->title,
                'description' => $request->description,
                'phone_number' => $request->phone_number,
                'address' => $request->address,
            ]);
            if($request->hasFile('images')){
                FileController::storeFile($request,School::TYPE, $school->id, File::TYPE['image'],'images');
            }
            $success = ModelSchool::create([
                'model_type' => ModelSchool::TYPES['user'],
                'model_id' => Auth::user()->id,
                'school_id' => $school->id,
            ]);
            if($success){
                session()->flash('success',__('other.Record successfully added'));
            }
        }catch (Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('school.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(School $school)
    {
        $images = $school->images;
        return view('cabinet.schools.show',compact('school','images'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(School $school)
    {
        $images = $school->images;
        return view('cabinet.schools.edit',compact('school','images'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, School $school)
    {
        try {
            $success = $school->update([
                'status' => $request->status,
                'type' => $request->type,
                'title' => $request->title,
                'description' => $request->description,
                'address' => $request->address,
                'phone_number' => $request->phone_number,
            ]);
            if($success){
                session()->flash('success',__('other.Information changed successfully'));
            }
        }catch (Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('school.edit',compact('school'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, School $school)
    {
        try {
            if($request->school_title == $school->title){
                if(count($school->files) != 0){
                    foreach ($school->files as $file){
                        FileController::deleteFile($file->id);
                    }
                }
                ModelSchool::where('school_id',$school->id)->delete();
                $success = $school->delete();
                if($success){
                    session()->flash('success',__('other.The record was successfully deleted'));
                }
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('school.index');
    }
}
