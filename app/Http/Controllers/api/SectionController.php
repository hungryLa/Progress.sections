<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\FileController;
use App\Models\File;
use App\Models\Occupation;
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
        $data['sections'] = $school->sections;
        return $data;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $data['school'] = School::find($request->school);
        $data['occupations'] = Occupation::orderBy('title')->get();
        return $data;
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
        $data['images'] = $section->images;
        return $data;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(School $school, Section $section)
    {
        $data['images'] = $section->images()->orderBy('position', 'asc')->get();
        return $data;
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
