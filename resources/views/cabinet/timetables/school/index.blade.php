@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <x-common.flash/>
            <h2>{{__('other.Timetables')}}</h2>
            <a class="btn btn-success" href="{{route('timetables.create',compact('school'))}}">{{__('other.Add a record')}}</a>
            @if(count($timetables) != 0)
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">{{__('other.Weekday')}}</th>
                        <th scope="col">{{__('other.Opening hours')}}</th>
                        <th scope="col">{{__('other.Time of one lesson')}}</th>
                        <th scope="col">{{__('other.Rest time')}}</th>
                        <th colspan="2">{{__('other.Control panel')}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($timetables as $timetable)
                        <tr>
                            <th scope="row">
                                <p>
                                    @foreach($timetable->weekday->which_days as $day)
                                        {{__('other.'.$day).','}}
                                    @endforeach
                                </p>
                            </th>
                            <td>{{__('other.From')}} {{\Carbon\Carbon::parse($timetable->workday_start)->format('H:i')}}
                                {{__('other.to')}} {{\Carbon\Carbon::parse($timetable->workday_end)->format('H:i')}}</td>
                            <td>{{\Carbon\Carbon::parse($timetable->lesson_time)->format('H:i')}}</td>
                            <td>
                                @if($timetable->without_rest)
                                    {{'Без отдыха'}}
                                @else
                                    {{__('other.From')}} {{\Carbon\Carbon::parse($timetable->rest_start)->format('H:i')}}
                                    {{__('other.to')}} {{\Carbon\Carbon::parse($timetable->rest_end)->format('H:i')}}
                                @endif
                            </td>
                            <td>
                                <a class="btn btn-warning" href="{{route('timetables.edit',compact('school','timetable'))}}">{{__('other.Change')}}</a>
                            </td>
                            <td>
                                <form method="POST" action="{{route('timetables.delete',compact('school','timetable'))}}">
                                    @csrf
                                    @method('DELETE')
                                    <button class="btn btn-danger">{{__('other.Delete')}}</button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            @endif
        </div>
    </div>
@endsection
