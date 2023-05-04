@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <x-common.flash/>
            <h2>{{__('other.Applications')}}</h2>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">{{__('form.Full name')}}</th>
                    <th scope="col">{{__('form.Title')}}</th>
                    <th colspan="2" scope="col">{{__('other.Control panel')}}</th>
                </tr>
                </thead>
                <tbody>
                @foreach($communications as $communication)
                    <tr>
                        <th scope="row">{{$communication->teacher->full_name}}</th>
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
