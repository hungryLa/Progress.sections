@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <x-common.flash/>
            <a class="btn btn-success" href="{{route('cabinet.teachers.create')}}">{{__('other.Add a record')}}</a>
            @if(count($teachers) != 0)
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">{{__('form.Full name')}}</th>
                        <th scope="col">{{__('form.Email address')}}</th>
                        <th colspan="2" scope="col">{{__('other.Control panel')}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($teachers as $teacher)
                        <tr>
                            <th scope="row">{{$teacher->id}}</th>
                            <td>{{$teacher->full_name}}</td>
                            <td>{{$teacher->email}}</td>
                            <td><a class="btn btn-warning" href="{{route('cabinet.teachers.edit',compact('teacher'))}}">{{__('other.Change')}}</a></td>
                            <td>
                                <form method="POST" action="{{route('cabinet.teachers.delete',compact('teacher'))}}">
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
