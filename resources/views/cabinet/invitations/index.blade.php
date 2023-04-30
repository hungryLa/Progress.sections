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
                @foreach($invitations as $invitation)
                    <tr>
                        <th scope="row">{{__('other.'.$invitation->status)}}</th>
                        <td>{{__('other.'.$invitation->school->type)}}</td>
                        <td>{{$invitation->school->title}}</td>
                        <td>
                            <form method="POST" action="{{route('invitations.accept',compact('invitation'))}}">
                                @csrf
                                <button class="btn btn-success">{{__('other.Accept')}}</button>
                            </form>
                        </td>
                        <td>
                            <form method="POST" action="{{route('invitations.cancel',compact('invitation'))}}">
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
