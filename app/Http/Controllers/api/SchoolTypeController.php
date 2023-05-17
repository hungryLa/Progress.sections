<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SchoolType\StoreRequest;
use App\Http\Requests\SchoolType\UpdateRequest;
use App\Models\SchoolType;

class SchoolTypeController extends Controller
{
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

    public function edit(UpdateRequest $request, SchoolType $schoolType)
    {
        try {
            $success = $schoolType->update([
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
