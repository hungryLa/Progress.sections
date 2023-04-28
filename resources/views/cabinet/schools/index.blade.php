@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <h2>{{__("other.Schools")}}</h2>
            <x-common.flash/>
            <a class="btn btn-success" href="{{route('school.create')}}">{{__('other.Add a record')}}</a>
            @if(count($schools) != 0)
                @foreach($schools as $school)
                    <x-schools.showCard :school="$school"/>
                @endforeach
            @endif
        </div>
    </div>
@endsection
