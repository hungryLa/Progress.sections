<?php

namespace App\Http\Controllers;

use App\Helpers\TinkoffMerchantAPI;
use App\Models\Payment;
use App\Models\School;
use App\Models\Subscription;
use App\Models\SubscriptionUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function storePayment(Request $request)
    {
        $school = School::find($request->school);
        $subscription = null;
        $timetable_section = null;
        $user = Auth::user();
        if ($request->subscription) {
            $subscription = Subscription::find($request->subscription);
            $amount = (float)number_format((float)$subscription->price, 2, '.', '');
            $description = 'Покупка абонемента"'.$subscription->title.'"';
        }
        $error = false;
        $message = false;
        $url = false;

        $terminalKey = config('payment.TINKOFF_TERMINAL_KEY');
        $secretKey = config('payment.TINKOFF_SECRET_KEY');
        $percent = config('payment.CARD_PERCENT');


//        $amount = (float)number_format((float)$request->amount, 2, '.', '');
        $amountCommission = $amount - ($amount * $percent); // Это число записывается на баланс аккаунта

        $receiptItem = [
            [
                'Name' => $description,
                'Price' => $amount * 100,
                'Quantity' => 1.00,
                'Amount' => $amount * 100,
                'PaymentMethod' => 'full_prepayment',
                'PaymentObject' => 'service',
                'Tax' => 'none'
            ]
        ];

        $receipt = [
            'EmailCompany' => 'admin@progressrb.ru',
            'Email' => $user->email,
            'Taxation' => 'usn_income',
            'Items' => $receiptItem,
        ];

        $params = [
            "OrderId" => uniqid(),               //идентификатор платежа
            "Amount" => $amount * 100,              //сумма всего платежа в копейках
            "Description" => $description,  //описание платежа
            "SuccessURL" => route(
                'payments.successPay',
                compact('user', 'school', 'subscription', 'timetable_section', 'amount')
            ),
            "FailURL" => route('payments.failPay', compact('school', 'subscription', 'timetable_section')),
            'Receipt' => $receipt,                  //данные для чека
            'DATA' => [
                'Email' => $user->email,
            ],
        ];

        // Создание счета
        $api = new TinkoffMerchantAPI(
            $terminalKey,  //Ваш Terminal_Key
            $secretKey   //Ваш Secret_Key
        );
        $api->init($params);
        if ($api->error) {
            $error = true;
            $message = $api->error;
            session()->flash('warning', $message);
            return redirect()->back();
        } else {
            if ($api->paymentUrl) {
                // Запись в бд о пополнении баланса
                $data = [
                    'user_id' => $user->id,
                    'amount' => $amount,
                    'uuid' => $api->paymentId,
                ];

                $payment = Payment::create($data);

                $url = $api->paymentUrl;
                return redirect($url);
            } else {
                $error = true;
                $message = 'Произошла ошибка при обработке запроса.';
                session()->flash('warning', $message);
                return redirect()->back();
            }
        }

//        return [
//            'error' => $error,
//            'message' => $message,
//            'url' => $url,
//        ];
    }

    public function successPay(Request $request)
    {
        $subscription = Subscription::find($request->subscription);
        $school = School::find($request->school);
        if ($request->subscription) {
            $subscriptionUser = SubscriptionUser::create([
                'user_id' => $request->user,
                'subscription_id' => $subscription->id,
                'price_subscription' => $request->amount,
            ]);
            if ($subscription->type == Subscription::TYPES['deposit']) {
                $subscriptionUser->update([
                    'deposit' => $subscription->value,
                ]);
            } elseif ($subscription->type == Subscription::TYPES['section card']) {
                $subscriptionUser->update([
                    'remaining_classes' => $subscription->value,
                ]);
            }
            if ($subscriptionUser) {
                session()->flash('success', __('other.The payment was successful'));
            }
            return redirect()->route('school.subscription.index', compact('school'));
        }
    }

    public function failPay(Request $request)
    {
        $subscription = Subscription::find($request->subscription);
        $school = School::find($request->school);
        if ($request->subscription) {
            session()->flash('danger', __('other.Payment failed'));
            return redirect()->route('school.subscription.index', compact('school'));
        }
    }
}
