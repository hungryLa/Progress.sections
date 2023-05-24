<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
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
            'api.verification.verify', now()->addHour(), [
                'id' => $this->data['user']->id,
                'hash' => sha1($this->data['user']->email),
            ]
        );
        $this->data['url'] = $url;
        $subject = __('other.Creating a user');
        return $this->view('emails.welcome')->subject($subject);
    }
}
