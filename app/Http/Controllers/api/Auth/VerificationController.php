<?php

namespace App\Http\Controllers\api\Auth;

use App\Mail\VerifyMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class VerificationController
{
    public function verify($id, $hash)
    {
        try {
            $user = User::find($id);
            if (Hash::check($user->email, $hash)) {
                $success = $user->update([
                    'email_verified_at' => Carbon::now()
                ]);
                if ($success) {
                    return response('Почта успешно подтверждена', 200);
                }
            } else {
                return response('Почта не подтверждена', 500);
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    public function resend()
    {
        try {
            $data['user'] = Auth::user();
            $success = Mail::to(Auth::user()->email)->send(new VerifyMail($data));
            if ($success) {
                return response('Письмо успешно отправлено', 200);
            } else {
                return response('Письмо не отправлено', 500);
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }
}
