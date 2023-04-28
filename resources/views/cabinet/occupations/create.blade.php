@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <x-common.flash/>
            <form method="POST" action="{{route('cabinet.occupations.store')}}">
                @csrf
                <x-form.inputText name="title" title="{{__('form.Title')}}"
                                  placeholder="{{__('form.Enter the title')}}" value="{{old('title')}}" disabled=""/>
                <button class="btn btn-success">{{__('other.Add a record')}}</button>
            </form>
        </div>
    </div>

@endsection
