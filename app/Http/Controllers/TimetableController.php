<?php

namespace App\Http\Controllers;
use App\Http\Resources\Timetable\TimetableResource;
use App\Models\School;
use App\Models\Teacher;
use App\Models\Timetable;
use App\Models\User;
use Illuminate\Http\Request;
use App\Structures\TimetableDaysWeek;

class TimetableController extends Controller
{

    public function index(Request $request){
        if($request->teacher){
            $teacher = Teacher::find($request->teacher);
            $timetables = $teacher->timetables;
            return view('cabinet.timetables.index',compact('teacher','timetables'));
        }
        elseif ($request->school){
            $school = School::find($request->school);
            $timetables = $school->timetables;
            return view('cabinet.timetables.school.index',compact('school','timetables'));
        }
    }

    public function api_index(Teacher $teacher){
        $data['timetables'] = $teacher->timetables;
        return $data;
    }

    public function create(Request $request){
        if($request->teacher){
            $teacher = Teacher::find($request->teacher);
            return view('cabinet.timetables.create',compact('teacher'));
        }
        elseif ($request->school){
            $school = School::find($request->school);
            return view('cabinet.timetables.school.create',compact('school'));
        }
    }

    public function store(Request $request){
        if($request->teacher){
            $teacher = Teacher::find($request->teacher);
            $model_id = $teacher->id;
            $model_type = Timetable::TYPES['teacher'];

        }
        elseif ($request->school){
            $school = School::find($request->school);
            $model_id = $school->id;
            $model_type = Timetable::TYPES['school'];
        }
        try {
            $success = Timetable::create([
                'type' => $model_type,
                'model_id' => $model_id,
                'weekday' => TimetableDaysWeek::fromArray([
                    'which_days' =>$request->weekday
                ]),
                'lesson_time' => $request->lesson_time,
                'workday_start' => $request->workday_start,
                'workday_end' => $request->workday_end,
                'without_rest' => $request->without_rest,
                'rest_start' => $request->rest_start,
                'rest_end' => $request->rest_end,
            ]);
            if($success) {
                session()->flash('success', __('other.Record successfully added'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        if($request->teacher){
            return redirect()->route('timetables.index',compact('teacher'));
        }
        elseif ($request->school){
            return redirect()->route('timetables.index',compact('school'));
        }
    }

    public function edit(Request $request,Timetable $timetable){
        $teacher = Teacher::find($request->teacher);
        return view('cabinet.timetables.edit',compact('teacher','timetable'));
    }

    public function update(Request $request, Timetable $timetable){
        $teacher = Teacher::find($request->teacher);
        try {
            $without_rest = $request->without_rest ?: false;
            $success = $timetable->update([
                'teacher_id' => $teacher->id,
                'weekday' => TimetableDaysWeek::fromArray([
                    'which_days' =>$request->weekday
                ]),
                'lesson_time' => $request->lesson_time,
                'workday_start' => $request->workday_start,
                'workday_end' => $request->workday_end,
                'without_rest' => $without_rest,
                'rest_start' => $request->rest_start,
                'rest_end' => $request->rest_end,
            ]);
            if($success){
                session()->flash('success',__('other.Information changed successfully'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('timetables.edit',compact('teacher','timetable'));
    }

    public function destroy(Timetable $timetable){
        try {
            $success = $timetable->delete();
            if($success){
                session()->flash('success',__('other.The record was successfully deleted'));
            }
        }
        catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->back();
    }
}
