@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <div class="col-3">
            @if(\Illuminate\Support\Facades\Auth::user()->hasRole(\App\Models\User::ROLES['schools_owner']))
                <a href="">{{__('other.Reservations')}}</a>
                <a href="{{route('sections.timetables.index',compact('section'))}}">{{__('other.Timetables')}}</a>
            @endif
{{--            <a href="{{route('section.index',compact('school'))}}">{{__('other.Go back')}}</a>--}}
        </div>
        <div class="col-9">
            <x-common.flash/>
            <a class="btn btn-success" href="{{route('sections.timetables.create',compact('section'))}}">{{__('other.Add a record')}}</a>
            @if(count($timetables) != 0)
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">{{__('other.Teacher')}}</th>
                        <th scope="col">{{__('form.Price of lesson')}}</th>
                        <th scope="col">{{__('form.Price of trial lesson')}}</th>
                        <th scope="col">{{__('form.Count in group')}}</th>
                    </tr>
                    </thead>
                    <tbody>
                        @foreach($timetables as $timetable)
                            <tr>
                                <th scope="row">{{$timetable->teacher ? $timetable->teacher->full_name : 'Без преподавателя'}}</th>
                                <td>{{$timetable->lesson_price}}</td>
                                <td>{{$timetable->trial_price}}</td>
                                <td>{{$timetable->group}}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            @endif
        </div>
    </div>
@endsection
