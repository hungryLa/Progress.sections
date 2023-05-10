<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TimetableSection\StoreRequest;
use App\Models\Section;
use App\Models\TimetableSection;
use Illuminate\Http\Request;

class TimetableSectionController extends Controller
{
    public function index(Section $section)
    {
        $data['section'] = $section;
        $data['timetables'] = $section->timetables;
        return $data;
    }

    public function create(Section $section)
    {
        $data['school'] = $section->school;
        $data['teachers'] = $data['school']->teachers;
        $data['school_timetables'] = $data['school']->timetables;
        return $data;
    }

    public function store(Section $section, StoreRequest $request)
    {
        try {
            $success = TimetableSection::create([
                'section_id' => $section->id,
                'timetable_id' => $request->timetable_id,
                'lesson_price' => $request->lesson_price,
                'trial_price' => $request->trial_price,
                'group' => $request->group,
                'group_price' => $request->group_price,
            ]);
            if ($success) {
                session()->flash('success', __('other.Record successfully added'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    public function edit(Section $section, TimetableSection $timetableSection)
    {
        $data['school'] = $section->school;
        $data['teachers'] = $data['school']->teachers;
        $data['timetableSection'] = $timetableSection;
        return $data;
    }

    public function update(Request $request, Section $section, TimetableSection $timetableSection)
    {
        try {
            $timetableSection->update([
                'timetable_id' => $request->timetable_id,
                'lesson_price' => $request->lesson_price,
                'trial_price' => $request->trial_price,
                'group' => $request->group,
                'group_price' => $request->group_price,
            ]);
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    public function destroy(Section $section, TimetableSection $timetableSection)
    {
        try {
            $success = $timetableSection->delete();
            if ($success) {
                session()->flash('success', __('other.The record was successfully deleted'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }
}
