<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\FileController;
use App\Http\Requests\School\StoreRequest;
use App\Http\Requests\School\UpdateRequest;
use App\Http\Resources\FileRecource;
use App\Http\Resources\SchoolRecource;
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
        $all_schools = [];
        if ($user->hasRole(User::ROLES['admin'])) {
            $school = School::orderBy('id')->get();
        } elseif ($user->hasRole(User::ROLES['schools_owner'])) {
            $school = $user->schools()->orderBy('id')->get();
        } elseif ($user->hasRole(User::ROLES['teacher'])) {
            $school = $user->schools()->orderBy('id')->get();
            $all_schools = School::where('status', School::STATUS['active'])->get();
            $all_schools = $all_schools->diff($school);
        } elseif ($user->hasRole(User::ROLES['user'])) {
            $school = School::where('status', School::STATUS['active'])->orderBy('id')->get();
        } else {
            $school = School::where('status', School::STATUS['active'])->orderBy('id')->get();
        }
        $data['school'] = SchoolRecource::collection($school);
        $data['all_schools'] = SchoolRecource::collection($all_schools);
        return $data;
    }

    public function store(StoreRequest $request)
    {
        try {
            $school = School::create([
                'status' => $request->status,
                'recruitment_open' => $request->recruitment_open,
                'type' => $request->type,
                'title' => $request->title,
                'description' => $request->description,
                'phone_number' => $request->phone_number,
                'address' => $request->address,
            ]);
            if ($request->hasFile('images')) {
                FileController::storeFile($request, School::TYPE, $school->id, File::TYPE['image'], 'images');
            }
            $success = ModelSchool::create([
                'model_type' => ModelSchool::TYPES['user'],
                'model_id' => Auth::user()->id,
                'school_id' => $school->id,
            ]);
            if ($success) {
                session()->flash('success', __('other.Record successfully added'));
            }
        } catch (Exception $exception) {
            return $exception->getMessage();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(School $school)
    {
        return FileRecource::collection($school->images);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(School $school)
    {
        return FileRecource::collection($school->images);
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
            if ($success) {
                session()->flash('success', __('other.Information changed successfully'));
            }
        } catch (Exception $exception) {
            return $exception->getMessage();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, School $school)
    {
        try {
            if ($request->school_title == $school->title) {
                if (count($school->files) != 0) {
                    foreach ($school->files as $file) {
                        FileController::deleteFile($file->id);
                    }
                }
                ModelSchool::where('school_id', $school->id)->delete();
                $success = $school->delete();
                if ($success) {
                    session()->flash('success', __('other.The record was successfully deleted'));
                }
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }
}