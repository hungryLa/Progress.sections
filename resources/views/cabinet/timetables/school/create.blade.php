@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <x-common.flash/>
            <form method="POST" action="{{route('timetables.store',compact('school'))}}">
                @csrf
                <div class="row">
                    @foreach(\App\Models\Timetable::DAYS_WEEK as $day)
                        <div class="form-check col">
                            <input class="form-check-input" type="checkbox" value="{{$day}}" id="Weekday.{{$day}}" name="weekday[]">
                            <label class="form-check-label" for="Weekday.{{$day}}">{{$day}}</label>
                        </div>
                    @endforeach
                </div>
                <div class="row">
                    <div class="col-4">
                        <x-form.InputWithType type="time" name="workday_start" title="Начало рабочего"
                                              placeholder="{{__('form.Enter a full name')}}" value="{{old('workday_start')}}" disabled=""/>
                    </div>
                    <div class="col-4">
                        <x-form.InputWithType type="time" name="lesson_time" title="Время одного занятия"
                                              placeholder="{{__('form.Enter a full name')}}" value="{{old('workday_start')}}" disabled=""/>
                    </div>
                    <div class="col-4">
                        <x-form.InputWithType type="time" name="workday_end" title="Конец рабочего"
                                              placeholder="{{__('form.Enter a full name')}}" value="{{old('full_name')}}" disabled=""/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2">
                        <label for="without_rest">Без отдыха</label>
                        <input type="checkbox" id="without_rest" name="without_rest">
                    </div>
                    <div class="col-5">
                        <x-form.InputWithType type="time" name="rest_start" title="Начало отдыха"
                                              placeholder="{{__('form.Enter a full name')}}" value="{{old('full_name')}}" disabled=""/>
                    </div>
                    <div class="col-5">
                        <x-form.InputWithType type="time" name="rest_end" title="Конец отдыха"
                                              placeholder="{{__('form.Enter a full name')}}" value="{{old('full_name')}}" disabled=""/>
                    </div>
                </div>

                <button class="btn btn-success">{{__('other.Add a record')}}</button>
            </form>
        </div>
    </div>
@endsection
