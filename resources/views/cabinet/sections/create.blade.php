@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <x-common.flash/>
            <form method="POST" action="{{route('cabinet.sections.store')}}" enctype="multipart/form-data">
                @csrf
                <x-form.Files name="images[]" title="{{__('form.Profile picture')}}" />
                <x-form.inputText name="title" title="{{__('form.Title')}}"
                                  placeholder="{{__('form.Enter the title')}}" value="{{old('title')}}" disabled=""/>
                <x-form.inputText name="description" title="{{__('form.Description')}}"
                                  placeholder="{{__('form.Enter the description')}}" value="{{old('description')}}" disabled=""/>
                <x-form.inputText name="address" title="{{__('form.Address')}}"
                                  placeholder="{{__('form.Enter the address')}}" value="{{old('address')}}" disabled=""/>
                <x-form.inputText name="phone_number" title="{{__('form.Phone number')}}"
                                  placeholder="{{__('form.Enter the phone number')}}" value="{{old('phone_number')}}" disabled=""/>
                <button class="btn btn-success">{{__('other.Add a record')}}</button>
            </form>
        </div>
    </div>
@endsection
