@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <div class="col-3">
            <a href="{{route('cabinet.user.index')}}">Все пользователи</a>
        </div>
        <div class="col-9">
            <form method="POST" action="{{route('cabinet.user.store')}}">
                @csrf
                <x-form.Select name="role" label="{{__('form.Role')}}" default-value="{{__('form.Choose a role')}}" disabled="">
                    @foreach(\App\Models\User::ROLES as $role)
                        <option value="{{$role}}" {{$role == old('role') ? 'selected' : ''}}>{{__('form.'.$role)}}</option>
                    @endforeach
                </x-form.Select>
                <x-form.inputText name="full_name" title="{{__('form.Full name')}}"
                                  placeholder="{{__('form.Enter a full name')}}" value="{{old('full_name')}}" disabled=""/>
                <x-form.inputText name="email" title="{{__('form.Email address')}}"
                                  placeholder="{{__('form.Enter a email address')}}" value="{{old('email')}}" disabled=""/>
                <button class="btn btn-success">{{__('other.Add a record')}}</button>
            </form>
        </div>
    </div>

@endsection
