@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <x-common.flash/>
            <a href="{{route('cabinet.users.create')}}">{{__('other.Create a user')}}</a>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">{{__('form.Role')}}</th>
                    <th scope="col">{{__('form.Full name')}}</th>
                    <th scope="col">{{__('form.Email address')}}</th>
                    <th colspan="2" scope="col">{{__('other.Control panel')}}</th>
                </tr>
                </thead>
                <tbody>
                @foreach($users as $user)
                    <tr>
                        <th scope="row">{{$user->id}}</th>
                        <td>{{__('form.'.$user->role)}}</td>
                        <td>{{$user->full_name}}</td>
                        <td>{{$user->email}}</td>
                        <td><a class="btn btn-warning" href="{{route('cabinet.users.edit',compact('user'))}}">{{__('other.Change')}}</a></td>
                        <td>
                            <form method="POST" action="{{route('cabinet.users.delete',compact('user'))}}">
                                @csrf
                                @method('DELETE')
                                <button class="btn btn-danger">{{__('other.Delete')}}</button>
                            </form>
                        </td>
                    </tr>
                @endforeach

                </tbody>
            </table>
        </div>
    </div>

@endsection
