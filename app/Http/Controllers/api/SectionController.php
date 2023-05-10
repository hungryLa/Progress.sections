<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\FileController;
use App\Http\Resources\FileRecource;
use App\Http\Resources\SectionRecource;
use App\Models\File;
use App\Models\School;
use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(School $school)
    {
        return SectionRecource::collection($school->sections);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $section = Section::create([
                'school_id' => $request->school,
                'occupation_id' => $request->occupation_id,
                'description' => $request->description,
                'contents' => $request->contents,
            ]);
            if ($request->hasFile('images')) {
                FileController::storeFile($request, Section::TYPE, $section->id, File::TYPE['image'], 'images');
            }
            if ($section) {
                session()->flash('success', __('other.Record successfully added'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
        if ($request->school) {
            $data['school'] = School::find($request->school);
            return $data;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(School $school, Section $section)
    {
        return FileRecource::collection($section->images);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(School $school, Section $section)
    {
        return FileRecource::collection($section->images()->orderBy('position', 'asc')->get());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, School $school, Section $section)
    {
        try {
            $success = $section->update([
                'occupation_id' => $request->occupation_id,
                'description' => $request->description,
                'contents' => $request->contents,
            ]);
            if ($success) {
                session()->flash('success', __('other.Information changed successfully'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Section $section)
    {
        try {
            if (count($section->images) != 0) {
                foreach ($section->images as $file) {
                    FileController::deleteFile($file->id);
                }
            }
            $success = $section->delete();
            if ($success) {
                session()->flash('success', __('other.The record was successfully deleted'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }
}
