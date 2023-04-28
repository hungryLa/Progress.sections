@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <x-common.flash/>
            <a href="{{route('cabinet.occupations.create')}}">{{__('other.Add a record')}}</a>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">{{__('form.Title')}}</th>
                    @if(Auth::user()->hasRole(\App\Models\User::ROLES['admin']))
                        <th colspan="2" scope="col">{{__('other.Control panel')}}</th>
                    @endif
                </tr>
                </thead>
                <tbody>
                @foreach($occupations as $occupation)
                    <tr>
                        <td>{{$occupation->title}}</td>
                        @if(Auth::user()->hasRole(\App\Models\User::ROLES['admin']))
                            <td><a class="btn btn-warning" href="{{route('cabinet.occupations.edit',compact('occupation'))}}">{{__('other.Change')}}</a></td>
                            <td>
                                <form method="POST" action="{{route('cabinet.occupations.delete',compact('occupation'))}}">
                                    @csrf
                                    @method('DELETE')
                                    <button class="btn btn-danger">{{__('other.Delete')}}</button>
                                </form>
                            </td>
                        @endif
                    </tr>
                @endforeach

                </tbody>
            </table>
        </div>
    </div>

@endsection
