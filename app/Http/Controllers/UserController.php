<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\ChangePasswordRequest;
use App\Http\Requests\User\StoreRequest;
use App\Models\ModelSchool;
use App\Models\ModelUser;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use voku\helper\ASCII;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::orderBy('id','desc')->get();
        return view('cabinet.users.index',compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('cabinet.users.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $success = User::create([
                'role' => $request->role,
                'username' => $request->username,
                'full_name' => $request->full_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'remember_token' => Str::random(15),
            ]);
            if($success){
                session()->flash('success','other.Record successfully added');
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('cabinet.users.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return view('cabinet.users.edit',compact('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        try {
            $success = $user->update([
               'role' => $request->role,
               'username' => $request->username,
               'full_name' => $request->full_name,
               'email' => $request->email,
            ]);
            if($success){
                session()->flash('success',__('other.Information changed successfully'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('cabinet.users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            $success = $user->delete();
            if($success){
                session()->flash('success',__('other.The record was successfully deleted'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('cabinet.users.index');
    }

    public function link_user(Request $request){
        try {
            $user = User::where('email',$request->email)->first();
            if(Hash::check($request->password,$user->password)){
                $success = ModelUser::create([
                    'model_type' => ModelUser::TYPES['users'],
                    'model_id' => $user->id,
                    'user_id' => Auth::user()->id,
                ]);
                if($success){
                    session()->flash('success',__('other.The user is successfully linked'));
                }
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->back();
    }

    public function unlink_user(User $user){
        try {
            $success = ModelUser::where([
                'user_id' => Auth::user()->id,
                'model_id' => $user->id,
            ])->delete();
            if($success){
                session()->flash('success',__('other.The user has been successfully unlinked'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->back();
    }

    public function settings(User $user){
        return view('cabinet.users.settings',compact('user'));
    }

    public function change_information(Request $request, User $user){
        try {
            $success = $user->update([
                'username' => $request->username,
                'full_name' => $request->full_name,
                'email' => $request->email,
            ]);
            if($success){
                session()->flash('success',__('other.Information changed successfully'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('cabinet.user.settings',compact('user'));
    }

    public function change_password(ChangePasswordRequest $request, User $user){
        try {
            if(Hash::check($request->password_old,$user->password)){
                $success = $user->update([
                    'password' => Hash::make($request->password_new),
                ]);
                if($success){
                    session()->flash('success',__('form.Password changed successfully'));
                }
            }else{
                session()->flash('danger',__('form.You entered an incorrect password'));
            }
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
        return redirect()->route('cabinet.user.settings',compact('user'));
    }
}
