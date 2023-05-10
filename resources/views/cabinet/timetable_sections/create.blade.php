@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <div class="col-3">
            @if(\Illuminate\Support\Facades\Auth::user()->hasRole(\App\Models\User::ROLES['schools_owner']))
                <a href="">{{__('other.Reservations')}}</a>
                <a href="{{route('sections.timetables.index',compact('section'))}}">{{__('other.Timetables')}}</a>
            @endif
        </div>
        <div class="col-9">
            <x-common.flash/>
            <form method="POST" action="{{route('sections.timetables.store',compact('section'))}}">
                @csrf
                <x-form.Select name="timetable_id" label="{{__('other.Timetable')}}" default-value="{{__('other.Select a timetable')}}" disabled="">
                    @foreach($school_timetables as $school_timetable)
                        <option value="{{$school_timetable->id}}" {{$school_timetable->id == old('timetable') ? 'selected' : ''}}>
                            {{$school_timetable->weekday}}
                            {{$school_timetable->lesson_time}}
                        </option>
                    @endforeach
                </x-form.Select>
{{--                <x-form.Select name="teachers" label="{{__('other.Teachers')}}" default-value="{{__('other.Choose the type of activity')}}" disabled="">--}}
{{--                    @foreach($teachers as $teacher)--}}
{{--                        <option value="{{$teacher->id}}" {{$teacher->id == old('teachers') ? 'selected' : ''}}>{{$teacher->full_name}}</option>--}}
{{--                    @endforeach--}}
{{--                </x-form.Select>--}}
                <x-form.inputText name="lesson_price" title="{{__('form.Price of lesson')}}"
                                  placeholder="{{__('form.Specify the price')}}" value="{{old('lesson_price')}}" disabled=""/>
                <x-form.inputText name="trial_price" title="{{__('form.Price of trial lesson')}}"
                                  placeholder="{{__('form.Specify the price')}}" value="{{old('trial_price')}}" disabled=""/>
                <x-form.inputText name="group" title="{{__('form.Count in group')}}"
                                  placeholder="{{__('form.Specify the price')}}" value="{{old('group')}}" disabled=""/>
                <x-form.inputText name="group_price" title="{{__('form.Price of group lesson')}}"
                                  placeholder="{{__('form.Specify the price')}}" value="{{old('group_price')}}" disabled=""/>
                <button class="btn btn-success">{{__('other.Add a record')}}</button>
            </form>
        </div>
    </div>
@endsection
