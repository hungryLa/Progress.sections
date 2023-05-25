<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\ChangePasswordRequest;
use App\Http\Requests\User\StoreRequest;
use App\Http\Resources\TeacherInformationRecource;
use App\Http\Resources\User\UserResource;
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

class  UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResource::collection(User::orderBy('id', 'desc')->get());
    }

    public function getOne(Request $request)
    {
        try {
            $user = User::where('id', $request->user)->first();
            if ($user->role === 'teacher') {
                $teacher = $user->getTeacher();
                $teacher_information = $teacher->information;
                $data['user'] = new UserResource($teacher);
                if ($teacher_information !== null) {
                    $data['teacher_information'] = new TeacherInformationRecource($teacher_information);
                }
            } else {
                $data['user'] = new UserResource($user);
            }
            return $data;
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
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
    }

    public function settings(User $user)
    {
        $teacher_information = null;
        $teacher = $user->getTeacher();
        if ($teacher) {
            $teacher_information = $teacher->information;
        }
        $data['teacher'] = new UserResource($teacher);
        $data['teacher_information'] = new TeacherInformationRecource($teacher_information);
        return $data;
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
    }
}
