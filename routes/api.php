<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\CommunicationController;
use App\Http\Controllers\api\FileController;
use App\Http\Controllers\api\OccupationController;
use App\Http\Controllers\api\PaymentController;
use App\Http\Controllers\api\PersonController;
use App\Http\Controllers\api\SchoolController;
use App\Http\Controllers\api\SectionController;
use App\Http\Controllers\api\SubscriptionController;
use App\Http\Controllers\api\TeacherController;
use App\Http\Controllers\api\TimetableController;
use App\Http\Controllers\api\TimetableSectionController;
use App\Http\Controllers\api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'namespace' => 'api',
    'middleware' => 'api',

], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});
Route::group(['middleware' => 'jwt.auth'], function () {
    Route::group(['prefix' => 'cabinet', 'middleware' => ['auth', 'verified']], function () {
        Route::group(['prefix' => 'users'], function () {
            Route::group(['middleware' => 'role:admin'], function () {
                Route::get('', [UserController::class, 'index'])->name('cabinet.user.index');
                Route::post('store', [UserController::class, 'store'])->name('cabinet.user.store');
            });
            Route::post('link_user', [UserController::class, 'link_user'])->name('cabinet.user.link_user');
            Route::delete('{user}/unlink_user', [UserController::class, 'unlink_user'])->name(
                'cabinet.user.unlink_user'
            );
            Route::group(['middleware' => 'role:admin'], function () {
                Route::get('{user}/edit', [UserController::class, 'edit'])->name('cabinet.user.edit');
                Route::put('{user}/update', [UserController::class, 'update'])->name('cabinet.user.update');
                Route::delete('{user}/delete', [UserController::class, 'destroy'])->name('cabinet.user.delete');
            });
            Route::get('{user}/settings', [UserController::class, 'settings'])->name('cabinet.user.settings');
            Route::put('{user}/change_information', [UserController::class, 'change_information'])->name(
                'cabinet.user.change_information'
            );
            Route::put('{user}/change_password', [UserController::class, 'change_password'])->name(
                'cabinet.user.change_password'
            );
            Route::post(
                '{user}/createOrUpdateTeacherInformation',
                [UserController::class, 'createOrUpdateTeacherInformation']
            )->name('cabinet.user.createOrUpdateTeacherInformation');
        });

        Route::group(['prefix' => 'schools/{school}/teachers', 'middleware' => 'role:schools_owner'], function () {
            Route::get('', [TeacherController::class, 'index'])->name('teacher.index');
            Route::get('create', [TeacherController::class, 'create'])->name('teacher.create');
            Route::post('store', [TeacherController::class, 'store'])->name('teacher.store');
            Route::get('{teacher}/edit', [TeacherController::class, 'edit'])->name('teacher.edit');
            Route::put('{teacher}/update', [TeacherController::class, 'update'])->name('teacher.update');
            Route::post('{teacher}/invite', [TeacherController::class, 'invite'])->name('teacher.invite');
            Route::delete('{teacher}/unlink', [TeacherController::class, 'unlink'])->name('teacher.unlink');
        });

        Route::group(['prefix' => 'timetables'], function () {
            Route::get('', [TimetableController::class, 'index'])->name('timetables.index');
            Route::get('create', [TimetableController::class, 'create'])->name('timetables.create');
            Route::post('store', [TimetableController::class, 'store'])->name('timetables.store');
            Route::get('{timetable}/edit', [TimetableController::class, 'edit'])->name('timetables.edit');
            Route::put('{timetable}/update', [TimetableController::class, 'update'])->name('timetables.update');
            Route::delete('{timetable}/delete', [TimetableController::class, 'destroy'])->name('timetables.delete');
        });

        Route::group(['prefix' => 'sections/{section}/timetable_sections'], function () {
            Route::get('', [TimetableSectionController::class, 'index'])->name('sections.timetables.index');
            Route::get('create', [TimetableSectionController::class, 'create'])->name('sections.timetables.create');
            Route::post('store', [TimetableSectionController::class, 'store'])->name('sections.timetables.store');
            Route::get('{timetableSection}/edit', [TimetableSectionController::class, 'edit'])->name(
                'sections.timetables.edit'
            );
            Route::put('{timetableSection}/update', [TimetableSectionController::class, 'update'])->name(
                'sections.timetables.update'
            );
            Route::delete('{timetableSection}/delete', [TimetableSectionController::class, 'destroy'])->name(
                'sections.timetables.delete'
            );
        });


        Route::group(['prefix' => 'schools'], function () {
            Route::get('', [SchoolController::class, 'index'])->name('school.index');
            Route::get('{school}', [SchoolController::class, 'getOne'])->name('school.get-one');
            Route::group(['middleware' => 'role:schools_owner'], function () {
                Route::get('create', [SchoolController::class, 'create'])->name('school.create');
                Route::post('store', [SchoolController::class, 'store'])->name('school.store');
            });
            Route::get('{school}/show', [SchoolController::class, 'show'])->name('school.show');
            Route::group(['middleware' => 'role:schools_owner'], function () {
                Route::get('{school}/edit', [SchoolController::class, 'edit'])->name('school.edit');
                Route::put('{school}/update', [SchoolController::class, 'update'])->name('school.update');
                Route::delete('{school}/delete', [SchoolController::class, 'destroy'])->name('school.delete');
            });
        });

        Route::group(['prefix' => 'schools/{school}/sections'], function () {
            Route::get('', [SectionController::class, 'index'])->name('section.index');
            Route::get('create', [SectionController::class, 'create'])->name('section.create');
            Route::post('store', [SectionController::class, 'store'])->name('section.store');
            Route::get('{section}', [SectionController::class, 'getOne'])->name('section.get-one');
            Route::put('{section}/update', [SectionController::class, 'update'])->name('section.update');
            Route::delete('{section}/delete', [SectionController::class, 'destroy'])->name('section.delete');
        });

        Route::group(['prefix' => 'users/{user}/subscriptions'], function () {
            Route::get('', [SubscriptionController::class, 'user_index'])->name('user.subscription.index');
        });
        Route::group(['prefix' => 'schools/{school}/subscriptions'], function () {
            Route::get('', [SubscriptionController::class, 'index'])->name('school.subscription.index');
            Route::group(['middleware' => 'role:schools_owner'], function () {
                Route::get('create', [SubscriptionController::class, 'create'])->name('school.subscription.create');
                Route::post('store', [SubscriptionController::class, 'store'])->name('school.subscription.store');
            });
            Route::get('{subscription}', [SubscriptionController::class, 'show'])->name('school.subscription.show');
            Route::group(['middleware' => 'role:schools_owner'], function () {
                Route::get('{subscription}/edit', [SubscriptionController::class, 'edit'])->name(
                    'school.subscription.edit'
                );
                Route::put('{subscription}/update', [SubscriptionController::class, 'update'])->name(
                    'school.subscription.update'
                );
                Route::delete('{subscription}/delete', [SubscriptionController::class, 'destroy'])->name(
                    'school.subscription.delete'
                );
            });
        });

        Route::group(['prefix' => 'payments'], function () {
            Route::post('storePayment', [PaymentController::class, 'storePayment'])->name('payments.storePayment');
            Route::get('successPay', [PaymentController::class, 'successPay'])->name('payments.successPay');
            Route::get('failPay', [PaymentController::class, 'failPay'])->name('payments.failPay');
        });

        Route::group(['prefix' => 'communications', 'middleware' => 'role:schools_owner,teacher'], function () {
            Route::get('invitations', [CommunicationController::class, 'invitation_index'])
                ->name('communications.invitation.index');
            Route::get('applications', [CommunicationController::class, 'application_index'])
                ->name('communications.application.index');
            Route::post('invite', [CommunicationController::class, 'send_invitation'])
                ->name('communications.teacher.invite');
            Route::delete('unlink', [CommunicationController::class, 'unlink'])->name('communications.teacher.unlink');
            Route::post('submit_application', [CommunicationController::class, 'submit_application'])
                ->name('communications.school.submit_application');
            Route::delete('cancel_application', [CommunicationController::class, 'cancel_application'])
                ->name('communications.school.cancel_application');
            Route::post('{communication}/accept', [CommunicationController::class, 'accept'])
                ->name('communications.accept');
            Route::delete('{communication}/cancel', [CommunicationController::class, 'cancel'])
                ->name('communications.cancel');
        });

        Route::group(['prefix' => 'occupations'], function () {
            Route::get('', [OccupationController::class, 'index'])->name('cabinet.occupations.index');
            Route::post('store', [OccupationController::class, 'store'])->name('cabinet.occupations.store');
            Route::get('{occupation}/edit', [OccupationController::class, 'edit'])->name('cabinet.occupations.edit');
            Route::delete('{occupation}/delete', [OccupationController::class, 'destroy'])
                ->name('cabinet.occupations.delete');
        });

        Route::group(['prefix' => 'people'], function () {
            Route::get('', [PersonController::class, 'index'])->name('cabinet.people.index');
            Route::post('store', [PersonController::class, 'store'])->name('cabinet.people.store');
            Route::post('{person}/delete', [PersonController::class, 'destroy'])->name('cabinet.people.delete');
        });

        Route::group(['prefix' => 'files'], function () {
            Route::post('storeImages/{modelType}/{model}/{fileType}', [FileController::class, 'storeImages'])->name(
                'cabinet.files.storeImages'
            );
            Route::delete('deleteImagesThroughCheckBox', [FileController::class, 'deleteFilesThroughCheckBox'])
                ->name('cabinet.files.deleteFilesThroughCheckBox');
            Route::post('changeImage', [FileController::class, 'changeImage'])->name('cabinet.files.changeImage');
        });
    });
});
