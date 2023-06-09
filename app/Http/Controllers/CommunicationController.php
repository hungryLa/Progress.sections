<?php

namespace App\Http\Controllers;

use App\Models\Communication;
use App\Models\ModelSchool;
use App\Models\School;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommunicationController extends Controller
{
    public function invitation_index()
    {
        $teacher = Teacher::find(Auth::user())->first();
        $communications = $teacher->invitations()->where('status', Communication::STATUS['invited'])->get();
        return view('cabinet.communications.invitations.index', compact('teacher', 'communications'));
    }

    public function application_index(Request $request)
    {
        $school = School::find($request->school);
        $communications = $school->applications()->where(
            'status',
            Communication::STATUS['The application has been sent']
        )->get();
        return view('cabinet.communications.applications.index', compact('school', 'communications'));
    }

    public function submit_application(Request $request)
    {
        try {
            $school = School::find($request->school);
            $success = Communication::create([
                'type' => Communication::TYPES['job request'],
                'school_id' => $school->id,
                'user_id' => Auth::user()->id,
                'status' => Communication::STATUS['The application has been sent']
            ]);
            if ($success) {
                session()->flash('success', __('other.The application has been sent'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
        return redirect()->back();
    }

    public function cancel_application(Request $request)
    {
        try {
            $school = School::find($request->school);
            $success = Communication::where([
                'type' => Communication::TYPES['job request'],
                'school_id' => $school->id,
                'user_id' => Auth::user()->id,
                'status' => Communication::STATUS['The application has been sent']
            ])->delete();
            if ($success) {
                session()->flash('success', __('other.Application cancelled'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
        return redirect()->back();
    }

    public function send_invitation(Request $request)
    {
        try {
            $school = School::find($request->school);
            $teacher = Teacher::find($request->teacher);
            $invitation = Communication::create([
                'type' => Communication::TYPES['invitation'],
                'school_id' => $school->id,
                'user_id' => $teacher->id,
                'status' => Communication::STATUS['invited'],
            ]);
            if ($invitation) {
                session()->flash('success', __('other.The invitation was successfully sent'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
        return redirect()->route('teacher.index', compact('school', 'teacher'));
    }

    public function unlink(Request $request)
    {
        try {
            $school = School::find($request->school);
            $teacher = Teacher::find($request->teacher);
            $success = ModelSchool::where([
                'model_type' => Teacher::TYPE,
                'model_id' => $teacher->id,
                'school_id' => $school->id,
            ])->delete();
            if ($success) {
                session()->flash('success', __('other.The teacher has been successfully unlinked'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
        return redirect()->route('teacher.index', compact('school'));
    }

    public function accept(Communication $communication)
    {
        try {
            $communication->update([
                'status' => Communication::STATUS['accepted'],
            ]);
            $success = ModelSchool::create([
                'status' => ModelSchool::STATUS['works'],
                'model_type' => ModelSchool::TYPES['teacher'],
                'model_id' => $communication->user_id,
                'school_id' => $communication->school_id,
            ]);
            if ($success) {
                if ($communication->type == Communication::TYPES['invitation']) {
                    session()->flash('success', __('other.Invitation accepted'));
                } elseif ($communication->type == Communication::TYPES['job request']) {
                    session()->flash('success', __('other.The application was accepted'));
                }
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
        return redirect()->back();
    }

    public function cancel(Communication $communication)
    {
        try {
            $success = $communication->delete();
            if ($success) {
                if ($communication->type == Communication::TYPES['invitation']) {
                    session()->flash('success', __('other.Invitation declined'));
                } elseif ($communication->type == Communication::TYPES['job request']) {
                    session()->flash('success', __('other.The application was rejected'));
                }
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
        return redirect()->back();
    }
}
