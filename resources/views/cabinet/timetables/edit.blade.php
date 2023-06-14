@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <x-common.flash/>
            <form method="POST" action="{{route('timetables.update',compact('teacher','timetable'))}}">
                @csrf
                @method('PUT')
                <div class="row">
                    @foreach(\App\Models\Timetable::DAYS_WEEK as $day)
                        <div class="form-check col">
                            <input class="form-check-input" type="checkbox" value="{{$day}}" id="Weekday.{{$day}}"
                                   name="weekday[]" @if (is_array($timetable->weekday->which_days) && in_array($day,$timetable->weekday->which_days)) checked @endif>
                            <label class="form-check-label" for="Weekday.{{$day}}">{{$day}}</label>
                        </div>
                    @endforeach
                </div>
                <div class="row">
                    <div class="col-4">
                        <x-form.InputWithType type="time" name="workday_start" title="Начало рабочего"
                                              placeholder="{{__('form.Enter a full name')}}" value="{{$timetable->workday_start}}" disabled=""/>
                    </div>
                    <div class="col-4">
                        <x-form.InputWithType type="time" name="lesson_time" title="Время одного занятия"
                                              placeholder="{{__('form.Enter a full name')}}" value="{{$timetable->lesson_time}}" disabled=""/>
                    </div>
                    <div class="col-4">
                        <x-form.InputWithType type="time" name="workday_end" title="Конец рабочего"
                                              placeholder="{{__('form.Enter a full name')}}" value="{{$timetable->workday_end}}" disabled=""/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2">
                        <label for="without_rest">Без отдыха</label>
                        <input type="checkbox" id="without_rest" name="without_rest" {{$timetable->without_rest ? 'checked': ''}}>
                    </div>
                    <div class="col-5">
                        <x-form.InputWithType type="time" name="rest_start" title="Начало отдыха"
                                              placeholder="{{__('form.Enter a full name')}}" value="{{$timetable->rest_start}}" disabled=""/>
                    </div>
                    <div class="col-5">
                        <x-form.InputWithType type="time" name="rest_end" title="Конец отдыха"
                                              placeholder="{{__('form.Enter a full name')}}" value="{{$timetable->rest_end}}" disabled=""/>
                    </div>
                </div>

                <button class="btn btn-success">{{__('other.Apply changes')}}</button>
            </form>
        </div>
    </div>
@endsection
