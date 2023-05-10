@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <x-common.flash/>
            <h2>{{__('other.Teachers')}}</h2>
            <a class="btn btn-success" href="{{route('teacher.create',compact('school'))}}">{{__('other.Add a record')}}</a>
            @if(count($active_teachers) != 0)
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">{{__('form.Full name')}}</th>
                        <th scope="col">{{__('form.Email address')}}</th>
                        <th scope="col">{{__('other.Control panel')}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($active_teachers as $active_teacher)
                        <tr>
                            <th scope="row">{{$active_teacher->id}}</th>
                            <td>{{$active_teacher->full_name}}</td>
                            <td>{{$active_teacher->email}}</td>
                            <td>
                                <form method="POST" action="{{route('communications.teacher.unlink',['school' => $school,'teacher' => $active_teacher])}}">
                                    @csrf
                                    @method('DELETE')
                                    <button class="btn btn-danger">{{__('other.Unlink')}}</button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            @endif
            @if(count($invitations) != 0)
                <h2>Приглашения</h2>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">{{__('other.Teacher')}}</th>
                        <th scope="col">{{__('form.Status')}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($invitations as $invitation)
                        <tr>
                            <td>{{$invitation->user->full_name}}</td>
                            <td>{{__('other.'.$invitation->status)}}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            @endif
            @if(count($teachers) != 0)
                <h2>Все преподаватели</h2>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">{{__('form.Full name')}}</th>
                        <th scope="col">{{__('form.Email address')}}</th>
                        <th scope="col">{{__('other.Control panel')}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($teachers as $teacher)
                        <tr>
                            <th scope="row">{{$teacher->id}}</th>
                            <td>{{$teacher->full_name}}</td>
                            <td>{{$teacher->email}}</td>
                            @if(count($teacher->invitations()->where(['school_id' => $school->id, 'status' => \App\Models\Communication::STATUS['invited']])->get()) == 0)
                            <td>
                                <form method="POST" action="{{route('communications.teacher.invite',['school' => $school,'teacher' => $teacher])}}">
                                    @csrf
                                    <button class="btn btn-success">{{__('other.To invite')}}</button>
                                </form>
                            </td>
                            @else
                                <td>
                                    @csrf
                                    <button class="btn btn-danger">{{__('other.Already invited')}}</button>
                                </td>
                            @endif
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            @endif
        </div>
    </div>
@endsection
