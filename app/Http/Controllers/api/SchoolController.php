<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
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
            $schools = School::orderBy('id')->get();
        } elseif ($user->hasRole(User::ROLES['schools_owner'])) {
            $schools = $user->schools()->orderBy('id')->get();
        } elseif ($user->hasRole(User::ROLES['teacher'])) {
            $schools = $user->schools()->orderBy('id')->get();
            $all_schools = School::where('status', School::STATUS['active'])->get();
            $all_schools = $all_schools->diff($schools);
        } elseif ($user->hasRole(User::ROLES['user'])) {
            $schools = School::where('status', School::STATUS['active'])->orderBy('id')->get();
        } else {
            $schools = School::where('status', School::STATUS['active'])->orderBy('id')->get();
        }
        $data['schools'] = SchoolRecource::collection($schools);
        $data['all_schools'] = SchoolRecource::collection($all_schools);
        return $data;
    }

    public function getOne(Request $request)
    {
        try {
            // dd($request);
            $school = School::where('id', $request->school)->first();
            return new SchoolRecource($school);
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    public function store(StoreRequest $request)
    {
        try {
            $school = School::create([
                'status' => $request->status,
                'recruitment_open' => $request->recruitment_open,
                'title' => $request->title,
                'description' => $request->description,
                'phone_number' => $request->phone_number,
                'address' => $request->address,
            ]);
            if ($request->hasFile('files')) {
                FileController::storeFile($request, School::TYPE, $school->id, File::TYPE['images']);
            }
            if ($request->school_types) {
                foreach ($request->school_types as $school_type) {
                    ModelSchool::create([
                        'model_type' => ModelSchool::TYPES['school_types'],
                        'model_id' => $school_type,
                        'school_id' => $school->id,
                    ]);
                }
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
                'title' => $request->title,
                'description' => $request->description,
                'recruitment_open' => $request->recruitment_open,
                'address' => $request->address,
                'phone_number' => $request->phone_number,
            ]);
            if ($request->school_types_to_add) {
                foreach ($request->school_types_to_add as $school_type) {
                    ModelSchool::create([
                        'model_type' => ModelSchool::TYPES['school_types'],
                        'model_id' => $school_type,
                        'school_id' => $school->id,
                    ]);
                }
            }
            if ($request->school_types_to_delete) {
                foreach ($request->school_types_to_delete as $school_type) {
                    ModelSchool::where([
                        'model_type' => ModelSchool::TYPES['school_types'],
                        'model_id' => $school_type,
                        'school_id' => $school->id,
                    ])->delete();
                }
            }
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
                        FileController::deleteFile($file);
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
