<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    public function sendResetLinkEmail(Request $request){

        $user = User::where('email',$request->email)->first();
        $this->validateEmail($request);

        $status = Password::sendResetLink(
            $request->only('email')
        );
        $token = Password::createToken($user);

        $success = $mail = Mail::send('emails.password_reset', ['token' => $token], function ($message) use ($request) {
            $message->to($request->email);
            $message->subject('Сброс пароля');
        });
        if($success){
            session()->flash('success','Письмо было успешно отправлено');
        }

        return back()->withInput($request->only('email'));
    }
}
