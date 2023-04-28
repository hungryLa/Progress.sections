@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <div class="col-3">

            @if(\Illuminate\Support\Facades\Auth::user()->hasRole(\App\Models\User::ROLES['sections_admin']))
                <a href="">{{__('other.Reservations')}}</a>
                <a href="">{{__('other.Schedules')}}</a>
                <a href="{{route('cabinet.sections.edit',compact('section'))}}">{{__('other.Edit')}}</a>
            @endif
            <a href="{{route('cabinet.sections.index')}}">{{__('other.Go back')}}</a>
        </div>
        <div class="col-9">
            <x-common.flash/>
            <x-common.image path="{{$image->path}}"/>
            <form>
                @csrf
                @method('PUT')
                <x-form.inputText name="title" title="{{__('form.Title')}}"
                                  placeholder="{{__('form.Enter the title')}}" value="{{$section->title}}" disabled="disabled"/>
                <x-form.inputText name="description" title="{{__('form.Description')}}"
                                  placeholder="{{__('form.Enter the description')}}" value="{{$section->description}}" disabled="disabled"/>
                <x-form.inputText name="address" title="{{__('form.Address')}}"
                                  placeholder="{{__('form.Enter the address')}}" value="{{$section->address}}" disabled="disabled"/>
                <x-form.inputText name="phone_number" title="{{__('form.Phone number')}}"
                                  placeholder="{{__('form.Enter the phone number')}}" value="{{$section->phone_number}}" disabled="disabled"/>
                <a class="btn btn-warning" href="{{route('cabinet.sections.edit',compact('section'))}}">{{__('other.Change')}}</a>
            </form>
        </div>
    </div>
@endsection
