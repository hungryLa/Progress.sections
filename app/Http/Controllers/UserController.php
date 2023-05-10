<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\ChangePasswordRequest;
use App\Http\Requests\User\StoreRequest;
use App\Mail\WelcomeMail;
use App\Models\ModelUser;
use App\Models\TeacherInformation;
use App\Models\User;
use App\Structures\TeacherOccupations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::orderBy('id', 'desc')->get();
//        $data['users'] = $users;
//        return $data;
        return view('cabinet.users.index', compact('users'));
    }

    public function create()
    {
        return view('cabinet.users.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        try {
            $password = Str::random(10);
            $user = User::create([
                'role' => $request->role,
                'full_name' => $request->full_name,
                'email' => $request->email,
                'password' => Hash::make($password),
                'remember_token' => Str::random(15),
            ]);
            $data['password'] = $password;
            $data['user'] = $user;
            $success = Mail::to($user->email)->send(new WelcomeMail($data));
            if ($success) {
                session()->flash('success', __('other.Record successfully added'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }


        return redirect()->route('cabinet.user.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
//        $data['user'] = $user;
//        return $data;
        return view('cabinet.users.edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        try {
            $success = $user->update([
                'role' => $request->role,
                'full_name' => $request->full_name,
                'email' => $request->email,
            ]);
            if ($success) {
                session()->flash('success', __('other.Information changed successfully'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
        return redirect()->route('cabinet.user.edit', compact('user'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            $success = $user->delete();
            if ($success) {
                session()->flash('success', __('other.The record was successfully deleted'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
        return redirect()->back();
    }

    public function link_user(Request $request)
    {
        try {
            $user = User::where('email', $request->email)->first();
            if (Hash::check($request->password, $user->password)) {
                $success = ModelUser::create([
                    'model_type' => ModelUser::TYPES['users'],
                    'model_id' => $user->id,
                    'user_id' => Auth::user()->id,
                ]);
                if ($success) {
                    session()->flash('success', __('other.The user is successfully linked'));
                }
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
        return redirect()->back();
    }

    public function unlink_user(User $user)
    {
        try {
            $success = ModelUser::where([
                'user_id' => Auth::user()->id,
                'model_id' => $user->id,
            ])->delete();
            if ($success) {
                session()->flash('success', __('other.The user has been successfully unlinked'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
        return redirect()->back();
    }

    public function settings(User $user)
    {
        $teacher_information = null;
        $teacher = $user->getTeacher();
        if ($teacher) {
            $teacher_information = $teacher->information;
        }
        return view('cabinet.users.settings', compact('user', 'teacher', 'teacher_information'));
    }

    public function change_information(Request $request, User $user)
    {
        try {
            $success = $user->update([
                'full_name' => $request->full_name,
                'phone_number' => $request->phone_number,
                'email' => $request->email,
            ]);
            if ($success) {
                session()->flash('success', __('other.Information changed successfully'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
        return redirect()->route('cabinet.user.settings', compact('user'));
    }

    public function change_password(ChangePasswordRequest $request, User $user)
    {
        try {
            if (Hash::check($request->password_old, $user->password)) {
                $success = $user->update([
                    'password' => Hash::make($request->password_new),
                ]);
                if ($success) {
                    session()->flash('success', __('form.Password changed successfully'));
                }
            } else {
                session()->flash('danger', __('form.You entered an incorrect password'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
        return redirect()->route('cabinet.user.settings', compact('user'));
    }

    public function createOrUpdateTeacherInformation(Request $request)
    {
        try {
            $teacher = \Auth::user()->getTeacher();
            if ($teacher->information) {
                $success = $teacher->information->update([
                    'occupations' => TeacherOccupations::fromArray([
                        'which_occupations' => $request->occupations
                    ]),
                    'teaching_experience' => $request->teaching_experience,
                    'about_me' => $request->about_me,
                ]);
            } else {
                $success = TeacherInformation::create([
                    'teacher_id' => $teacher->id,
                    'occupations' => TeacherOccupations::fromArray([
                        'which_occupations' => $request->occupations
                    ]),
                    'teaching_experience' => $request->teaching_experience,
                    'about_me' => $request->about_me,
                ]);
            }
            if ($success) {
                session()->flash('success', __('other.Information changed successfully'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
        return redirect()->route('cabinet.user.settings', ['user' => $teacher->id]);
    }
}
