<?php

namespace App\Http\Controllers;

use App\Http\Resources\Timetable\TimetableResource;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;

class TimetableController extends Controller
{

    public function index(Teacher $teacher){
        $data['timetables'] = TimetableResource::collection($teacher->timetables);
        return $data;
    }
}
