<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GeneralController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OccupationController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\FileController;

use App\Http\Controllers\CabinetController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\InvitationController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');

//Route::get('/',[GeneralController::class,'main_page'])->name('website.main_page');
//
//Route::group(['prefix' => 'cabinet','middleware' => 'auth'],function(){
//    Route::get('',[CabinetController::class,'main'])->name('cabinet.main');
//
//    Route::group(['prefix' => 'users'],function(){
//        Route::group(['middleware' => 'role:admin'],function(){
//            Route::get('index',[UserController::class,'index'])->name('cabinet.user.index');
//            Route::get('create',[UserController::class,'create'])->name('cabinet.user.create');
//            Route::post('store',[UserController::class,'store'])->name('cabinet.user.store');
//        });
//        Route::post('link_user',[UserController::class,'link_user'])->name('cabinet.user.link_user');
//        Route::delete('{user}/unlink_user',[UserController::class,'unlink_user'])->name('cabinet.user.unlink_user');
//        Route::group(['middleware' => 'role:admin'],function(){
//            Route::get('{user}/edit',[UserController::class,'edit'])->name('cabinet.user.edit');
//            Route::put('{user}/update',[UserController::class,'update'])->name('cabinet.user.update');
//            Route::delete('{user}/delete',[UserController::class,'destroy'])->name('cabinet.user.delete');
//        });
//        Route::get('{user}/settings',[UserController::class,'settings'])->name('cabinet.user.settings');
//        Route::put('{user}/change_information',[UserController::class, 'change_information'])->name('cabinet.user.change_information');
//        Route::put('{user}/change_password',[UserController::class,'change_password'])->name('cabinet.user.change_password');
//
//    });
//
//    Route::group(['prefix' => 'schools'],function (){
//       Route::get('',[SchoolController::class,'index'])->name('school.index');
//       Route::group(['middleware' => 'role:schools_owner'],function (){
//           Route::get('create',[SchoolController::class,'create'])->name('school.create');
//           Route::post('store',[SchoolController::class,'store'])->name('school.store');
//       });
//       Route::get('{school}/show',[SchoolController::class,'show'])->name('school.show');
//       Route::group(['middleware' => 'role:schools_owner'],function (){
//           Route::get('{school}/edit',[SchoolController::class,'edit'])->name('school.edit');
//           Route::put('{school}/update',[SchoolController::class,'update'])->name('school.update');
//           Route::delete('{school}/delete',[SchoolController::class,'destroy'])->name('school.delete');
//       });
//    });
//
//    Route::group(['prefix' => 'schools/{school}/sections'], function (){
//       Route::get('',[SectionController::class,'index'])->name('section.index');
//       Route::get('create',[SectionController::class,'create'])->name('section.create');
//       Route::post('store',[SectionController::class,'store'])->name('section.store');
//       Route::get('{section}',[SectionController::class,'show'])->name('section.show');
//       Route::get('{section}/edit',[SectionController::class,'edit'])->name('section.edit');
//       Route::put('{section}/update',[SectionController::class,'update'])->name('section.update');
//       Route::delete('{section}/delete',[SectionController::class,'destroy'])->name('section.delete');
//    });
//
//    Route::group(['prefix' => 'schools/{school}/teachers','middleware' => 'role:schools_owner'],function(){
//        Route::get('',[TeacherController::class,'index'])->name('teacher.index');
//        Route::get('create',[TeacherController::class,'create'])->name('teacher.create');
//        Route::post('store',[TeacherController::class,'store'])->name('teacher.store');
//        Route::get('{teacher}/edit',[TeacherController::class,'edit'])->name('teacher.edit');
//        Route::put('{teacher}/update',[TeacherController::class,'update'])->name('teacher.update');
//        Route::post('{teacher}/invite',[TeacherController::class,'invite'])->name('teacher.invite');
//        Route::delete('{teacher}/unlink',[TeacherController::class,'unlink'])->name('teacher.unlink');
//    });
//
//    Route::group(['prefix' => 'invitations','middleware' => 'role:teacher'],function(){
//        Route::get('invitations',[InvitationController::class,'index'])->name('invitations.index');
//        Route::post('{invitation}/accept',[InvitationController::class,'accept'])->name('invitations.accept');
//        Route::delete('{invitation}/cancel',[InvitationController::class,'cancel'])->name('invitations.cancel');
//    });
//
//    Route::group(['prefix' => 'occupations'],function(){
//        Route::get('index',[OccupationController::class,'index'])->name('cabinet.occupations.index');
//        Route::get('create',[OccupationController::class,'create'])->name('cabinet.occupations.create');
//        Route::post('store',[OccupationController::class,'store'])->name('cabinet.occupations.store');
//        Route::get('{occupation}/edit',[OccupationController::class,'edit'])->name('cabinet.occupations.edit');
//        Route::delete('{occupation}/delete',[OccupationController::class,'destroy'])->name('cabinet.occupations.delete');
//    });
//
//    Route::group(['prefix' => 'people'],function (){
//       Route::get('index',[PersonController::class,'index'])->name('cabinet.people.index');
//       Route::post('store',[PersonController::class,'store'])->name('cabinet.people.store');
//       Route::post('{person}/delete',[PersonController::class,'destroy'])->name('cabinet.people.delete');
//    });
//
//    Route::group(['prefix' => 'files'],function (){
//        Route::post('storeImages/{modelType}/{model}/{fileType}',[FileController::class,'storeImages'])->name('cabinet.files.storeImages');
//        Route::delete('deleteImagesThroughCheckBox',[FileController::class,'deleteFilesThroughCheckBox'])
//            ->name('cabinet.files.deleteFilesThroughCheckBox');
//        Route::post('changeImage', [FileController::class,'changeImage'])->name('cabinet.files.changeImage');
//    });
//});
//
//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
//Auth::routes([
//    'verify' => true
//]);
//
