@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <div class="col-3">
            <a href="{{route('cabinet.users.index')}}">Все пользователи</a>
        </div>
        <div class="col-9">
            <form method="POST" action="{{route('cabinet.users.update',compact('user'))}}">
                @csrf
                @method('PUT')
                <x-form.Select name="role" label="{{__('form.Role')}}" default-value="{{__('form.Choose a role')}}" disabled="">
                    @foreach(\App\Models\User::ROLES as $role)
                        <option value="{{$role}}" {{$role == $user->role ? 'selected' : ''}}>{{__('form.'.$role)}}</option>
                    @endforeach
                </x-form.Select>
                <x-form.inputText name="username" title="{{__('form.Username')}}"
                                  placeholder="{{__('form.Enter your username')}}" value="{{$user->username}}" disabled=""/>
                <x-form.inputText name="full_name" title="{{__('form.Full name')}}"
                                  placeholder="{{__('form.Enter a full name')}}" value="{{$user->full_name}}" disabled=""/>
                <x-form.inputText name="email" title="{{__('form.Email address')}}"
                                  placeholder="{{__('form.Enter a email address')}}" value="{{$user->email}}" disabled=""/>
                <button class="btn btn-success">{{__('other.Apply changes')}}</button>
            </form>
        </div>
    </div>

@endsection
