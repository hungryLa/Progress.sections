@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <x-common.flash/>
            <form method="POST" action="{{route('cabinet.teachers.update',compact('teacher'))}}">
                @csrf
                @method('PUT')
                <x-form.inputText name="full_name" title="{{__('form.Full name')}}"
                                  placeholder="{{__('form.Enter a full name')}}" value="{{$teacher->full_name}}" disabled=""/>
                <x-form.inputText name="email" title="{{__('form.Email address')}}"
                                  placeholder="{{__('form.Enter a email address')}}" value="{{$teacher->email}}" disabled=""/>
                <button class="btn btn-success">{{__('other.Apply changes')}}</button>
            </form>
        </div>
    </div>
@endsection
