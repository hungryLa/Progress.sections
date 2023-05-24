<?php

namespace App\Http\Controllers\api\Auth;

use App\Mail\WelcomeMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class RegisterController
{

    public function register(Request $request)
    {
        try {
            $user = User::create([
                'role' => $request->role,
                'full_name' => $request->full_name,
                'email' => $request->email,
                'password' => \Hash::make($request->password),
            ]);
            $data['password'] = $user->password;
            $data['user'] = $user;
            $success = Mail::to($user->email)->send(new WelcomeMail($data));
            if ($success) {
                return response('Пользователь успешно создан', 200);
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }
}
