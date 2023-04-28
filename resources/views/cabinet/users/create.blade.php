@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <div class="col-3">
            <a href="{{route('cabinet.users.index')}}">Все пользователи</a>
        </div>
        <div class="col-9">
            <form method="POST" action="{{route('cabinet.users.store')}}">
                @csrf
                <x-form.Select name="role" label="{{__('form.Role')}}" default-value="{{__('form.Choose a role')}}" disabled="">
                    @foreach(\App\Models\User::ROLES as $role)
                        <option value="{{$role}}" {{$role == old('role') ? 'selected' : ''}}>{{__('form.'.$role)}}</option>
                    @endforeach
                </x-form.Select>
                <x-form.inputText name="username" title="{{__('form.Username')}}"
                                  placeholder="{{__('form.Enter your username')}}" value="{{old('username')}}" disabled=""/>
                <x-form.inputText name="full_name" title="{{__('form.Full name')}}"
                                  placeholder="{{__('form.Enter a full name')}}" value="{{old('full_name')}}" disabled=""/>
                <x-form.inputText name="email" title="{{__('form.Email address')}}"
                                  placeholder="{{__('form.Enter a email address')}}" value="{{old('email')}}" disabled=""/>
                <x-form.InputWithType type="password" name="password" title="{{__('form.Password')}}"
                                      placeholder="{{__('form.Enter password')}}" value="{{old('password')}}" disabled=""/>
                <x-form.InputWithType type="password" name="password_confirmation" title="{{__('form.Confirm password')}}"
                                      placeholder="{{__('form.Enter password again')}}" value="{{old('password_confirmation')}}" disabled=""/>
                <button class="btn btn-success">{{__('other.Add a record')}}</button>
            </form>
        </div>
    </div>

@endsection
