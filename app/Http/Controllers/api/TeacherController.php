<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Teacher\StoreRequest;
use App\Http\Requests\Teacher\UpdateRequest;
use App\Http\Resources\CommunicationRecource;
use App\Http\Resources\TeacherRecource;
use App\Http\Resources\User\UserResource;
use App\Models\Communication;
use App\Models\ModelSchool;
use App\Models\School;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(School $school)
    {
        $invitations = $school->invitations()->where('status', Communication::STATUS['invited'])->get();
        $teachers = Teacher::where('role', User::ROLES['teacher'])->get();
        $data['active_teachers'] = TeacherRecource::collection($school->teachers);
        $data['teachers'] = TeacherRecource::collection($teachers->diff($data['active_teachers']));
        $data['invitations'] = CommunicationRecource::collection($invitations);
        return $data;
    }

    public function getOne(Request $request)
    {
        try {
            $teacher = Teacher::where('id', $request->teacher)->first();
            return new TeacherRecource($teacher);
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request, School $school)
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
            if ($success) {
                session()->flash('success', __('other.Record successfully added'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
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
            if ($success) {
                session()->flash('success', __('other.Apply changes'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    public function invite(School $school, Teacher $teacher)
    {
        try {
            $invitation = Communication::create([
                'type' => Communication::TYPES['invitation'],
                'school_id' => $school->id,
                'user_id' => $teacher->id,
                'status' => Communication::STATUS['invited'],
            ]);
            if ($invitation) {
                session()->flash('success', __('other.The invitation was successfully sent'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    public function unlink(School $school, Teacher $teacher)
    {
        try {
            $success = ModelSchool::where([
                'model_type' => Teacher::TYPE,
                'model_id' => $teacher->id,
                'school_id' => $school->id,
            ])->delete();
            if ($success) {
                session()->flash('success', __('other.The teacher has been successfully unlinked'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }
}
