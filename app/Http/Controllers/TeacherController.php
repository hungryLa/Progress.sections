<?php

namespace App\Http\Controllers;

use App\Http\Requests\Teacher\UpdateRequest;
use App\Models\Invitation;
use App\Models\ModelSchool;
use App\Models\ModelUser;
use App\Models\School;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(School $school)
    {
        $active_teachers = $school->teachers;
        $invitations = $school->invitations()->where('status',Invitation::STATUS['invitation'])->get();
        $teachers = Teacher::where('role',User::ROLES['teacher'])->get();
        $teachers = $teachers->diff($active_teachers);
        return view('cabinet.teachers.index',compact('school','active_teachers','teachers','invitations'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(School $school)
    {
        return view('cabinet.teachers.create',compact('school'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, School $school)
    {
        try {
            $teacher = User::create([
                'role' => User::ROLES['teacher'],
                'full_name' => $request->full_name,
                'email' => $request->email,
                'password' => Hash::make(Str::random(15)),
                'remember_token' => Str::random(15),
            ]);
            $success = ModelSchool::create([
                'status' => ModelSchool::STATUS['works'],
                'model_type' => Teacher::TYPE,
                'model_id' => $teacher->id,
                'school_id' => $school->id,
            ]);
            if($success){
                session()->flash('success',__('other.Record successfully added'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('teacher.index',compact('school'));
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
    public function edit(School $school, Teacher $teacher)
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

    public function invite(School $school,Teacher $teacher){
        try {
            $invitation = Invitation::create([
                'school_id' => $school->id,
                'user_id' => $teacher->id,
                'status' => Invitation::STATUS['invitation'],
            ]);
//            $success = ModelUser::create([
//                'model_type' => ModelUser::TYPES['invitation'],
//                'model_id' => $invitation->id,
//                'user_id' => $teacher->id,
//            ]);
            if($invitation){
                session()->flash('success',__('other.The invitation was successfully sent'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('teacher.index',compact('school','teacher'));
    }
    public function unlink(School $school, Teacher $teacher)
    {
        try {
            $success = ModelSchool::where([
                'model_type' => Teacher::TYPE,
                'model_id' => $teacher->id,
                'school_id' => $school->id,
            ])->delete();
            if($success){
                session()->flash('success',__('other.The teacher has been successfully unlinked'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('teacher.index',compact('school'));
    }
}
