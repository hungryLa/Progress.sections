<?php

namespace App\Http\Controllers\api\Auth;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

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
}
