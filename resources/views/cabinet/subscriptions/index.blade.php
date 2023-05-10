@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.school_sidebar :school="$school"/>
        <div class="col-9">
            <x-common.flash/>
            <h2>{{__('other.Subscriptions')}}</h2>
            <a class="btn btn-success" href="{{route('school.subscription.create',compact('school'))}}">{{__('other.Add a record')}}</a>

            @if(count($subscriptions) != 0)
            <div class="row">
                @foreach($subscriptions as $subscription)
                    <x-subscriptions.showCard :school="$school" :subscription="$subscription"/>
                @endforeach
            </div>
            @endif
        </div>
    </div>
@endsection
