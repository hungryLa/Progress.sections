<?php

namespace App\Http\Controllers;

use App\Http\Resources\Timetable\TimetableResource;
use App\Models\Teacher;
use App\Models\Timetable;
use App\Models\User;
use Illuminate\Http\Request;

class TimetableController extends Controller
{

    public function index(Teacher $teacher){
        $data['timetables'] = TimetableResource::collection($teacher->timetables);
        return $data;
    }

    public function store(Request $request, Teacher $teacher){
        try {
            $success = Timetable::create([
                'teacher_id' => $teacher->id,
                'days_week' => $request->days_week,
                'lesson_time' => $request->lesson_time,
                'workday_start' => $request->workday_start,
                'workday_end' => $request->workday_end,
                'rest' => $request->rest,
                'rest_start' => $request->rest_start,
                'rest_end' => $request->rest_end,
            ]);
            if($success) {
                session()->flash('success', __('other.Record successfully added'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
    }

    public function edit(Request $request, Teacher $teacher, Timetable $timetable){
        try {
            $success = $timetable->update([
                'teacher_id' => $teacher->id,
                'days_week' => $request->days_week,
                'lesson_time' => $request->lesson_time,
                'workday_start' => $request->workday_start,
                'workday_end' => $request->workday_end,
                'rest' => $request->rest,
                'rest_start' => $request->rest_start,
                'rest_end' => $request->rest_end,
            ]);
            if($success){
                session()->flash('success',__('other.Information changed successfully'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
    }

    public function destroy(Teacher $teacher, Timetable $timetable){
        try {
            $success = $timetable->delete();
            if($success){
                session()->flash('success',__('other.The record was successfully deleted'));
            }
        }
        catch (\Exception $exception){
            return $exception->getMessage();
        }
    }
}
