<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SchoolType\StoreRequest;
use App\Http\Requests\SchoolType\UpdateRequest;
use App\Http\Resources\SchoolTypeRecource;
use App\Http\Resources\SectionRecource;
use App\Models\SchoolType;
use Illuminate\Http\Request;

class SchoolTypeController extends Controller
{
    public function index()
    {
        return SchoolTypeRecource::collection(SchoolType::orderBy('id')->get());
    }

    public function getOne(Request $request)
    {
        try {
            $school_type = SchoolType::where('id', $request->school_type)->first();
            return new SchoolTypeRecource($school_type);
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    public function store(StoreRequest $request)
    {
        try {
            $success = SchoolType::create([
                'title' => $request->title,
                'color' => $request->color,
            ]);
            if ($success) {
                session()->flash('success', __('other.Record successfully added'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    public function edit(Request $request, SchoolType $school_type)
    {
        try {
            $success = $school_type->update([
                'title' => $request->title,
                'color' => $request->color,
            ]);
            if ($success) {
                session()->flash('success', __('other.Information changed successfully'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    public function delete(SchoolType $schoolType)
    {
        try {
            $success = $schoolType->delete();
            if ($success) {
                session()->flash('success', __('other.The record was successfully deleted'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }
}
