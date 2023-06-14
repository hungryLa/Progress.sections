@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <x-common.flash/>
            <h2>{{__('other.Subscriptions')}}</h2>
            @if(count($subscriptions) != 0)
                <div class="row">
                    @foreach($subscriptions as $subscription)
                        <x-subscriptions.showCardForUsers :school="$subscription->school" :subscription="$subscription"/>
                    @endforeach
                </div>
            @endif
        </div>
    </div>
@endsection
