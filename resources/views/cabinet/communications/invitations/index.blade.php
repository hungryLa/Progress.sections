@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <x-common.flash/>
            <h2>{{__('other.Invitations')}}</h2>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">{{__('other.Type of school')}}</th>
                    <th scope="col">{{__('form.Title')}}</th>
                    <th colspan="2" scope="col">{{__('other.Control panel')}}</th>
                </tr>
                </thead>
                <tbody>
                @foreach($communications as $communication)
                    <tr>
                        <th scope="row">{{__('other.'.$communication->status)}}</th>
                        <td>{{__('other.'.$communication->school->type)}}</td>
                        <td>{{$communication->school->title}}</td>
                        <td>
                            <form method="POST" action="{{route('communications.accept',compact('communication'))}}">
                                @csrf
                                <button class="btn btn-success">{{__('other.Accept')}}</button>
                            </form>
                        </td>
                        <td>
                            <form method="POST" action="{{route('communications.cancel',compact('communication'))}}">
                                @csrf
                                @method('DELETE')
                                <button class="btn btn-danger">{{__('other.Cancel')}}</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>

@endsection
