@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.school_sidebar :school="$school"/>
        <div class="col-9">
            <x-common.flash/>
            @if(count($images) != 0)
            <x-common.slider :images="$images" />
            @endif
            <form>
                <x-form.Select name="status" label="{{__('form.Status')}}" default-value="{{__('form.Select the status')}}" disabled="disabled">
                    @foreach(\App\Models\School::STATUS as $status)
                        <option value="{{$status}}" {{$status == $school->status ? 'selected' : ''}}>{{__('form.'.$status)}}</option>
                    @endforeach
                </x-form.Select>
                <x-form.Select name="type" label="{{__('form.Type of school')}}" default-value="{{__('form.Select type of school')}}" disabled="disabled">
                    @foreach(\App\Models\School::SCHOOL_TYPES as $type)
                        <option value="{{$type}}" {{$type == $school->type ? 'selected' : ''}}>{{__('form.'.$type)}}</option>
                    @endforeach
                </x-form.Select>
                <x-form.inputText name="title" title="{{__('form.Title')}}"
                                  placeholder="{{__('form.Enter the title')}}" value="{{$school->title}}" disabled="disabled"/>
                <x-form.inputText name="description" title="{{__('form.Description')}}"
                                  placeholder="{{__('form.Enter the description')}}" value="{{$school->description}}" disabled="disabled"/>
                <x-form.inputText name="address" title="{{__('form.Address')}}"
                                  placeholder="{{__('form.Enter the address')}}" value="{{$school->address}}" disabled="disabled"/>
                <x-form.inputText name="phone_number" title="{{__('form.Phone number')}}"
                                  placeholder="{{__('form.Enter the phone number')}}" value="{{$school->phone_number}}" disabled="disabled"/>
                <a class="btn btn-warning" href="{{route('school.edit',compact('school'))}}">{{__('other.Change')}}</a>
            </form>
        </div>
    </div>
@endsection
