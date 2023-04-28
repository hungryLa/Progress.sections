<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\ModelSection;
use App\Models\School;
use App\Models\Section;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if($request->school){
            $school = School::find($request->school);
            $sections = $school->sections;
            return view('cabinet.sections.index',compact('sections'));
        }else{
            $sections = Auth::user()->sections;
            return view('cabinet.sections.index',compact('sections'));
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('cabinet.sections.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $section = Section::create([
                'title' => $request->title,
                'description' => $request->description,
                'address' => $request->address,
                'phone_number' => $request->phone_number,
            ]);
            FileController::storeFile($request, Section::TYPE, $section->id, File::TYPE['image'],'images');
            $success = ModelSection::create([
               'model_type' => User::TYPE,
               'model_id' => Auth::user()->id,
               'section_id' => $section->id,
            ]);
            if($success){
                session()->flash('success',__('other.Record successfully added'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('cabinet.sections.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Section $section)
    {
        $image = $section->images()->orderBy('position','asc')->first();
        return view('cabinet.sections.show',compact('section','image'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Section $section)
    {
        $images = $section->images()->orderBy('position','asc')->get();
        return view('cabinet.sections.edit',compact('section','images'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Section $section)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Section $section)
    {
        try {
            ModelSection::where([
                'model_type' => User::TYPE,
                'section_id' =>$section->id
            ])->delete();
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
