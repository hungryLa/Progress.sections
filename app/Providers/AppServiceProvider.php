<?php

namespace App\Providers;

use App\Mail\VerifyMail;
use App\Mail\WelcomeMail;
use Carbon\Carbon;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(function ($notifiable) {

            // Генерация ссылки для подтверждения письма
            $verifyUrl = URL::temporarySignedRoute(
                'verification.verify', Carbon::now()->addMinutes(60), [
                    'id' => $notifiable->getKey(),
                    'hash' => sha1($notifiable->getEmailForVerification())
                ]
            );

            return (new MailMessage)
                ->subject('Подтверждение почты') // Тема письма
                ->view('emails.verify', ['url' => $verifyUrl]); // Шаблон письма
        });
    }
}
