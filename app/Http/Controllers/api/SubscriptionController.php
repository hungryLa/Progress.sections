<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\FileController;
use App\Http\Requests\Subscriptions\StoreRequest;
use App\Models\File;
use App\Models\School;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(School $school)
    {
        if (\Auth::user()->hasRole(User::ROLES['schools_owner'])) {
            $subscriptions = $school->subscriptions;
        } else {
            $subscriptions = $school->subscriptions()->where('status', Subscription::STATUS['active'])->get();
        }
    }

    public function user_index(User $user)
    {
        return $user->subscriptions;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(School $school)
    {
        return $school->sections;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request, School $school)
    {
        try {
            $subscription = Subscription::create([
                'school_id' => $school->id,
                'section_id' => $request->section_id,
                'status' => $request->status,
                'type' => $request->type,
                'price' => $request->price,
                'title' => $request->title,
                'value' => $request->value,
                'contents' => $request->contents,
            ]);
            if ($request->hasFile('images')) {
                FileController::storeFile(
                    $request,
                    Subscription::TYPE,
                    $subscription->id,
                    File::TYPE['image'],
                    'images'
                );
            }
            if ($subscription) {
                session()->flash('success', __('other.Record successfully added'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(School $school, Subscription $subscription)
    {
        return $school->sections;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(School $school, Subscription $subscription)
    {
        return $school->sections;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, School $school, Subscription $subscription)
    {
        try {
            $success = $subscription->update([
                'section_id' => $request->section_id,
                'status' => $request->status,
                'type' => $request->type,
                'price' => $request->price,
                'title' => $request->title,
                'value' => $request->value,
                'contents' => $request->contents,
            ]);
            if ($success) {
                session()->flash('success', __('other.Record successfully added'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(School $school, Subscription $subscription)
    {
        try {
            if (count($subscription->users) == 0) {
                $success = $subscription->delete();
                if ($success) {
                    session()->flash('success', __('other.Record successfully added'));
                }
            } else {
                session()->flash('warning', __('other.This subscription is still in use'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }
}
