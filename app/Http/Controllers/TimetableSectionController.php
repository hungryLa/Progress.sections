<?php

namespace App\Http\Controllers;

use App\Http\Requests\TimetableSection\StoreRequest;
use App\Http\Resources\SectionRecource;
use App\Http\Resources\TimetableSectionRecource;
use App\Models\Section;
use App\Models\TimetableSection;
use Illuminate\Http\Request;

class TimetableSectionController extends Controller
{
    public function index(Section $section){
        $timetables = $section->timetables;
        return view('cabinet.timetable_sections.index',compact('section','timetables'));
    }

    public function create(Section $section){
        $school = $section->school;
        $teachers = $school->teachers;
        $school_timetables = $school->timetables;
        return view('cabinet.timetable_sections.create',compact('section','teachers','school_timetables'));
    }

    public function store(Section $section, StoreRequest $request){
        try {
            $success = TimetableSection::create([
                'section_id' => $section->id,
                'timetable_id' => $request->timetable_id,
                'lesson_price' => $request->lesson_price,
                'trial_price' => $request->trial_price,
                'group' => $request->group,
                'group_price' => $request->group_price,
            ]);
            if($success){
                session()->flash('success',__('other.Record successfully added'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('sections.timetables.index',compact('section'));
    }

    public function edit(Section $section, TimetableSection $timetableSection){
        $school = $section->school;
        $teachers = $school->teachers;
        return view('cabinet.timetable_sections.edit',compact('section','teachers','timetableSection'));
    }

    public function update(Request $request, Section $section, TimetableSection $timetableSection){
        try {
            $timetableSection->update([
                'timetable_id' => $request->timetable_id,
                'lesson_price' => $request->lesson_price,
                'trial_price' => $request->trial_price,
                'group' => $request->group,
                'group_price' => $request->group_price,
            ]);
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('cabinet.timetable_sections.edit',compact('section','timetableSection'));
    }

    public function destroy(Section $section, TimetableSection $timetableSection){
        try {
            $success = $timetableSection->delete();
            if($success){
                session()->flash('success',__('other.The record was successfully deleted'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('sections.timetables.index',compact('section'));
    }
}
