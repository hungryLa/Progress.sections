@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <div class="col-3">

            @if(\Illuminate\Support\Facades\Auth::user()->hasRole(\App\Models\User::ROLES['schools_owner']))
                <a href="">{{__('other.Reservations')}}</a>
                <a href="{{route('sections.timetables.index',compact('section'))}}">{{__('other.Timetables')}}</a>
            @endif
            <a href="{{route('section.index',compact('school'))}}">{{__('other.Go back')}}</a>
        </div>
        <div class="col-9">
            <x-common.flash/>
            @if(count($images) != 0)
                <x-common.slider :images="$images" />
            @endif
            <form>
                @csrf
                @method('PUT')
                <x-form.inputText name="title" title="{{__('other.Type of occupation')}}"
                                  placeholder="{{__('other.Choose the type of activity')}}" value="{{$section->occupation->title}}" disabled="disabled"/>
                <x-form.inputText name="description" title="{{__('form.Description')}}"
                                  placeholder="{{__('form.Enter the description')}}" value="{{$section->description}}" disabled="disabled"/>
                <x-form.Textarea name="contents" value="{{$section->description}}" title="{{__('form.Contents')}}"
                                 placeholder="{{__('form.Enter the contents')}}" disabled="disabled"/>
                <a class="btn btn-warning" href="{{route('section.edit',compact('school','section'))}}">{{__('other.Change')}}</a>
            </form>
        </div>
    </div>
@endsection
