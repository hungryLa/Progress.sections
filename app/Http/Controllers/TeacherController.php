<?php

namespace App\Http\Controllers;

use App\Http\Requests\Teacher\UpdateRequest;
use App\Models\ModelUser;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teachers = Auth::user()->teachers;
        return view('cabinet.teachers.index',compact('teachers'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('cabinet.teachers.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $teacher = User::create([
                'role' => User::ROLES['teacher'],
                'username' => $request->username,
                'full_name' => $request->full_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            $success = ModelUser::create([
                'model_type' => Teacher::TYPE,
                'model_id' => $teacher->id,
                'user_id' => Auth::user()->id,
            ]);
            if($success){
                session()->flash('success',__('other.Record successfully added'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('cabinet.teachers.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Teacher $teacher)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Teacher $teacher)
    {
        return view('cabinet.teachers.edit',compact('teacher'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Teacher $teacher)
    {
        try {
            $success = $teacher->update([
                'username' => $request->username,
                'full_name' => $request->full_name,
                'email' => $request->email,
            ]);
            if($success){
                session()->flash('success',__('other.Apply changes'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('cabinet.teachers.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Teacher $teacher)
    {
        try {
            ModelUser::where([
                'model_type' => Teacher::TYPE,
                'model_id' => $teacher->id
            ])->delete();
            $success = $teacher->delete();
            if($success){
                session()->flash('success',__('other.The record was successfully deleted'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('cabinet.teachers.index');
    }
}
