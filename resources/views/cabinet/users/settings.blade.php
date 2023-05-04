@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <x-common.flash/>
            <h2>{{__('other.General information')}}</h2>
            <form method="POST" action="{{route('cabinet.user.change_information',compact('user'))}}">
                @csrf
                @method('PUT')
                <input type="hidden" name="role" value="{{$user->role}}">
                <x-form.inputText name="full_name" value="{{$user->full_name}}" title="{{__('form.Full name')}}" placeholder="{{__('form.Enter a full name')}}" disabled=""/>
                <x-form.inputText name="email" value="{{$user->email}}" title="{{__('form.Email address')}}" placeholder="{{__('form.Enter a email address')}}" disabled=""/>
                <button class="btn btn-success">{{__('other.Apply changes')}}</button>
            </form>

            <h2>{{__('form.Password')}}</h2>
            <form method="POST" action="{{route('cabinet.user.change_password',compact('user'))}}">
                @csrf
                @method('PUT')
                <x-form.InputWithType type="password" name="password_old" value="{{old('password_old')}}" title="{{__('form.Password')}}" placeholder="{{__('form.Enter password')}}" disabled=""/>
                <x-form.InputWithType type="password" name="password_new" value="{{old('password_new')}}" title="{{__('form.New password')}}" placeholder="{{__('form.Enter new password')}}" disabled=""/>
                <button class="btn btn-success">{{__('other.Apply changes')}}</button>
            </form>
        </div>
    </div>

@endsection
