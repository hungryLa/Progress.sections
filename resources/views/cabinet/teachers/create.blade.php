@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <x-common.flash/>
            <form method="POST" action="{{route('teacher.store',compact('school'))}}">
                @csrf
                <x-form.inputText name="full_name" title="{{__('form.Full name')}}"
                                  placeholder="{{__('form.Enter a full name')}}" value="{{old('full_name')}}" disabled=""/>
                <x-form.inputText name="email" title="{{__('form.Email address')}}"
                                  placeholder="{{__('form.Enter a email address')}}" value="{{old('email')}}" disabled=""/>
                <button class="btn btn-success">{{__('other.Add a record')}}</button>
            </form>
        </div>
    </div>
@endsection
