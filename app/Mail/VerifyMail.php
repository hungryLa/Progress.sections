<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\URL;

class VerifyMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function build()
    {
        $url = URL::temporarySignedRoute(
            'verification.verify', now()->addDay(), [
                'id' => $this->data['user']->id,
                'hash' => Hash::make($this->data['user']->email),
            ]
        );
        $this->data['url'] = $url;
        $subject = "Подтверждение почты";
        return $this->view('emails.verify')->subject($subject);
    }
}
