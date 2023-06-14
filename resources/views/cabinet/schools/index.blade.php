@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <div class="mb-3">
                <h2>{{__("other.Schools")}}</h2>
                <x-common.flash/>
                <a class="btn btn-success" href="{{route('school.create')}}">{{__('other.Add a record')}}</a>
                @if(count($schools) != 0)
                <div class="row">
                    @foreach($schools as $school)
                        <x-schools.showCardForActiveSchools :school="$school"/>
                    @endforeach
                </div>
                @endif
            </div>
            @if(count($all_schools) != 0)
            <div class="mb-3">
                <h2>{{__("other.All schools")}}</h2>
                    <div class="row">
                        @foreach($all_schools as $all_school)
                            <x-schools.showCard :school="$all_school"/>
                        @endforeach
                    </div>
            </div>
            @endif
        </div>
    </div>
@endsection
