<?php

namespace App\Mail;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\URL;

class WelcomeMail extends Mailable
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
            'verification.verify', now()->addHour(), [
                'id' => $this->data['user']->id,
                'hash' => sha1($this->data['user']->email),
            ]
        );
        $this->data['url'] = $url;
        $subject = __('other.Creating a user');
        return $this->view('emails.welcome')->subject($subject);
    }
}
