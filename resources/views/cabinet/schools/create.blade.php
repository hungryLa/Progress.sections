@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <h2>{{__("other.Schools")}}</h2>
            <x-common.flash/>
            <form method="POST" action="{{route('school.store')}}" enctype="multipart/form-data">
                @csrf
                <x-form.File name="images[]" title="{{__('form.Gallery')}}" multiple="multiple" />
                <x-form.Select name="status" label="{{__('form.Status')}}" default-value="{{__('form.Select the status')}}" disabled="">
                    @foreach(\App\Models\School::STATUS as $status)
                        <option value="{{$status}}" {{$status == old('status') ? 'selected' : ''}}>{{__('form.'.$status)}}</option>
                    @endforeach
                </x-form.Select>
                <x-form.Select name="type" label="{{__('form.Type of school')}}" default-value="{{__('form.Select type of school')}}" disabled="">
                    @foreach(\App\Models\School::SCHOOL_TYPES as $type)
                        <option value="{{$type}}" {{$type == old('type') ? 'selected' : ''}}>{{__('form.'.$type)}}</option>
                    @endforeach
                </x-form.Select>
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
