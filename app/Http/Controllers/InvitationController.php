<?php

namespace App\Http\Controllers;

use App\Models\Invitation;
use App\Models\ModelSchool;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InvitationController extends Controller
{

    public function index(){
        $teacher = Teacher::find(Auth::user())->first();
        $invitations = $teacher->invitations()->where('status',Invitation::STATUS['invitation'])->get();
        return view('cabinet.invitations.index',compact('teacher','invitations'));
    }
    public function accept(Invitation $invitation){
        try {
            $invitation->update([
               'status' => Invitation::STATUS['accepted'],
            ]);
            $success =  ModelSchool::create([
               'model_type' => ModelSchool::TYPES['teacher'],
               'model_id' => $invitation->user_id,
               'school_id' => $invitation->school_id,
            ]);
            if($success){
                session()->flash('success',__('other.Invitation accepted'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('invitations.index');
    }

    public function cancel(Invitation $invitation){
        try {
            $success = $invitation->update([
                'status' => Invitation::STATUS['rejected'],
            ]);
            if($success){
                session()->flash('success',__('other.Invitation declined'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('invitations.index');
    }
}
