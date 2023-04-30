<?php

namespace App\Http\Controllers;

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
            $sections = $school->sections;
            return view('cabinet.sections.index',compact('school','sections'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $school = School::find($request->school);
        return view('cabinet.sections.create',compact('school'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $section = Section::create([
                'school_id' => $request->school,
                'title' => $request->title,
                'description' => $request->description,
                'contents' => $request->contents,
            ]);
            if($request->hasFile('images')){
                FileController::storeFile($request, Section::TYPE, $section->id, File::TYPE['image'],'images');
            }
            if($section){
                session()->flash('success',__('other.Record successfully added'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        if ($request->school){
            $school = School::find($request->school);
            return redirect()->route('section.index',compact('school'));
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(School $school, Section $section)
    {
        $images = $section->images;
        return view('cabinet.sections.show',compact('school','section','images'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(School $school, Section $section)
    {
        $images = $section->images()->orderBy('position','asc')->get();
        return view('cabinet.sections.edit',compact('school','section','images'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,School $school,  Section $section)
    {
        try {
            $success = $section->update([
                'title' => $request->title,
                'description' => $request->description,
                'contents' => $request->contents,
            ]);
            if($success){
                session()->flash('success',__('other.Information changed successfully'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('section.edit',compact('school','section'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Section $section)
    {
        try {
            if(count($section->images) != 0){
                foreach ($section->images as $file){
                    FileController::deleteFile($file->id);
                }
            }
            $success = $section->delete();
            if($success){
                session()->flash('success',__('other.The record was successfully deleted'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('cabinet.sections.index');
    }
}
