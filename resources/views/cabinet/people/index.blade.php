@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <x-common.flash/>
            <div>
                <form method="POST" action="{{route('cabinet.people.store')}}">
                    @csrf
                    <x-form.inputText name="full_name" title="{{__('form.Full name')}}" value="{{old('full_name')}}"
                                      placeholder="{{__('form.Enter a full name')}}" disabled=""/>
                    <x-form.InputWithType type="date" name="date_birth" value="{{old('date_birth')}}" title="{{__('form.Date of birth')}}"
                                          placeholder="" disabled=""/>
                    <x-form.Select name="gender" label="{{__('form.Gender')}}" default-value="{{__('form.Specify the gender')}}" disabled="">
                        @foreach(\App\Models\General::GENDER as $gender)
                            <option value="{{$gender}}" {{$gender == old('gender') ? 'selected' : ''}}>{{__('form.'.$gender)}}</option>
                        @endforeach
                    </x-form.Select>
                    <button class="btn btn-success">{{__('other.Add a person')}}</button>
                </form>
            </div>

            <div>
                <form method="POST" action="{{route('cabinet.users.link_user')}}">
                    @csrf
                    <x-form.inputText name="email" title="{{__('form.Email address')}}" value="{{old('email')}}"
                                      placeholder="{{__('form.Enter a email address')}}" disabled=""/>
                    <x-form.InputWithType type="password" name="password" value="{{old('password')}}" title="{{__('form.Password')}}"
                                          placeholder="{{__('form.Enter password')}}" disabled=""/>
                    <button class="btn btn-success">{{__('other.Link an account')}}</button>
                </form>
            </div>

            @if(count($linked_users) != 0)
            <h4>{{__('other.Linked Accounts')}}</h4>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">{{__('form.Full name')}}</th>
                    <th scope="col">{{__('form.Email address')}}</th>
                    <th scope="col">{{__('other.Control panel')}}</th>
                </tr>
                </thead>
                <tbody>
                <div>
                    @foreach($linked_users as $linked_user)
                        <tr>
                            <td>{{$linked_user->full_name}}</td>
                            <td>{{$linked_user->email}}</td>
                            <td>
                                <form method="POST" action="{{route('cabinet.users.unlink_user',['user' => $linked_user])}}">
                                    @csrf
                                    @method('DELETE')
                                    <button class="btn btn-danger">{{__('other.Unlink')}}</button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </div>
                </tbody>
            </table>
            @endif
            @if(count($people) != 0)
            <h4>{{__('other.People')}}</h4>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">{{__('form.Full name')}}</th>
                    <th scope="col">{{__('form.Date of birth')}}</th>
                    <th scope="col">{{__('form.Gender')}}</th>
                    <th scope="col">{{__('other.Control panel')}}</th>
                </tr>
                </thead>
                <tbody>
                <div>
                    @foreach($people as $person)
                        <tr>
                            <td>{{$person->full_name}}</td>
                            <td>{{$person->date_birth}}</td>
                            <td>{{__('form.'.$person->gender)}}</td>
                            <td>
                                <form method="POST" action="{{route('cabinet.people.delete',compact('person'))}}">
                                    @csrf
                                    <button class="btn btn-danger">{{__('other.Delete')}}</button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </div>
                </tbody>
            </table>
            @endif
        </div>
    </div>
@endsection
