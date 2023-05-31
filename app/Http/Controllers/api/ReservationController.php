<?php

namespace App\Http\Controllers\api;

use App\Helpers\TinkoffMerchantAPI;
use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Reservation;
use App\Models\Section;
use App\Models\SubscriptionUser;
use App\Models\TimetableSection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $user = User::find($request->user);
            $timetableSection = TimetableSection::find($request->timetableSection);
            $section = $timetableSection->section;
            if (
                (count(
                        Reservation::where([
                            'timetable_section_id' => $timetableSection->id,
                            'date' => $request->date,
                            'time' => $request->time,
                        ])->get()
                    ) == 0)
            ) {
                if ($request->payment_type == 'card') {
                    $res = self::storePayment($request);
                } elseif ($request->payment_type == 'section_subscription') {
                    $res = self::payBySectionSubscription($user, $section);
                } elseif ($request->payment_type == 'money_subscription') {
                    $res = self::payByMoneySubscription($user, $section, $request->price);
                }
                if ($res['status'] == 'success') {
                    $success = Reservation::create([
                        'user_id' => $request->user,
                        'timetable_section_id' => $timetableSection->id,
                        'client' => $request->client,
                        'date' => $request->date,
                        'time' => $request->time,
                    ]);
                    if ($success) {
                        $data['status'] = 'success';
                        $data['message'] = __('other.Record successfully added');
                    }
                }
            } else {
                $data['status'] = 'error';
                $data['message'] = __('flash.The record for this time has already been made');
                return $data;
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reservation $reservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        //
    }

    static function storePayment(Request $request)
    {
        $user = Auth::user();
        if ($request->timetableSection) {
            $section = TimetableSection::find($request->timetableSection)->section;
            $amount = (float)number_format((float)$request->price, 2, '.', '');
            $description = 'Покупка занятия на "'.$section->title.'"';
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
//            "SuccessURL" => route(
//                'payments.successPay',
//                compact('user', 'school', 'subscription', 'timetable_section', 'amount')
//            ),
//            "FailURL" => route('payments.failPay', compact('school', 'subscription', 'timetable_section')),
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
            } else {
                $error = true;
                $message = 'Произошла ошибка при обработке запроса.';
                session()->flash('warning', $message);
            }
        }

        return [
            'error' => $error,
            'message' => $message,
            'url' => $url,
        ];
    }

    static function payBySectionSubscription(User $user, Section $section)
    {
        $subscription_user = null;
        foreach ($user->subscriptions as $subscription) {
            if ($subscription->section_id == $section->id) {
                $subscription_user = SubscriptionUser::where([
                    'user_id' => $user->id,
                    'subscription_id' => $subscription->id,
                ])->first();
                break;
            }
        }
        if ($subscription_user && $subscription_user->remaining_classes > 0) {
            $success = $subscription_user->update([
                'remaining_classes' => $subscription_user->remaining_classes - 1,
            ]);
            if ($subscription_user->remaining_classes == 0) {
                $subscription_user->delete();
                $data['message'] = 'Абонемент закончился';
            }
            if ($success) {
                $data['status'] = 'success';
            }
        } else {
            $data['status'] = 'error';
            $data['message'] = 'У вас нету абонемента для данной секции';
        }
        return $data;
    }

    static function payByMoneySubscription(User $user, Section $section, $price)
    {
        $subscription_user = null;
        foreach ($user->subscriptions as $subscription) {
            if ($subscription->section_id == $section->id) {
                $subscription_user = SubscriptionUser::where([
                    'user_id' => $user->id,
                    'subscription_id' => $subscription->id,
                ])->first();
                break;
            }
        }
        if ($subscription_user && $subscription_user->deposit >= $price) {
            $success = $subscription_user->update([
                'deposit' => $subscription_user->deposit - $price,
            ]);
            if ($subscription_user->deposit == 0) {
                $subscription_user->delete();
                $data['message'] = 'Абонемент закончился';
            }
            if ($success) {
                $data['status'] = 'success';
            }
        } else {
            $data['status'] = 'error';
            $data['message'] = 'У вас недостаточно средств на абонементе';
        }
        return $data;
    }
}
