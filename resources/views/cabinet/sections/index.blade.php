@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <div class="col-3">
            @if(\Illuminate\Support\Facades\Auth::user()->hasRole(\App\Models\User::ROLES['admin']))
                <a href="{{route('cabinet.user.index')}}">{{__('other.List of users')}}</a>
                <a href="{{route('cabinet.occupations.index')}}">{{__('other.Types of classes')}}</a>
            @endif
            @if(\Illuminate\Support\Facades\Auth::user()->hasRole(\App\Models\User::ROLES['schools_owner']))
                <a href="{{route('school.show',compact('school'))}}">{{__('other.School')}}</a>
                {{--        <a href="{{route('cabinet.teachers.index')}}">{{__('other.Teachers')}}</a>--}}
            @endif
            <form method="POST" action="{{route('logout')}}">
                @csrf
                <button class="btn">{{__('other.Logout')}}</button>
            </form>
        </div>
        <div class="col-9">
            <x-common.flash/>
            <a class="btn btn-success" href="{{route('section.create',compact('school'))}}">{{__('other.Add a record')}}</a>
            @if(count($sections) != 0)
                @foreach($sections as $section)
                    <x-sections.showCard :school="$school" :section="$section"/>
                @endforeach
            @endif
        </div>
    </div>
@endsection
