@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <x-common.flash/>
            <h2>{{__('other.General information')}}</h2>
            <form method="POST" action="{{route('cabinet.user.change_information',compact('user'))}}">
                @csrf
                @method('PUT')
                <input type="hidden" name="role" value="{{$user->role}}">
                <x-form.inputText name="full_name" value="{{$user->full_name}}" title="{{__('form.Full name')}}" placeholder="{{__('form.Enter a full name')}}" disabled=""/>
                <x-form.inputText name="phone_number" value="{{$user->phone_number}}" title="{{__('form.Phone number')}}" placeholder="{{__('form.Enter the phone number')}}" disabled=""/>
                <x-form.inputText name="email" value="{{$user->email}}" title="{{__('form.Email address')}}" placeholder="{{__('form.Enter a email address')}}" disabled=""/>
                <button class="btn btn-success">{{__('other.Apply changes')}}</button>
            </form>
            @if(Auth::user()->hasRole(\App\Models\User::ROLES['teacher']))
                <h2>Информация о преподавателе</h2>
                <form method="POST" action="{{route('cabinet.user.createOrUpdateTeacherInformation',['user' => $teacher])}}">
                    @csrf
                    <div class="mb-3">
                        <label for="occupations" class="form-label">{{__('other.Types of occupations')}}</label>
                        <textarea class="form-control @error('occupations') border-danger @enderror" id="occupations" name="occupations" placeholder="" rows="3">
                            @foreach($teacher_information->occupations->which_occupations as $occupation)
                                {{$occupation}}
                            @endforeach
                        </textarea>
                        @error('occupations')
                        <span class="text-danger small">{{$message}}</span>
                        @enderror
                    </div>
                    <x-form.inputText name="teaching_experience" value="{{$teacher_information ? $teacher_information->teaching_experience : old('teaching_experience')}}"
                                      title="{{__('form.Teaching experience')}}" placeholder="{{__('form.Describe your teaching experience')}}" disabled=""/>
                    <x-form.Textarea name="about_me" value="{{$teacher_information ? $teacher_information->about_me : old('about_me')}}"
                                     title="{{__('form.About me')}}" placeholder="{{__('form.Provide information about yourself')}}" disabled=""/>
                    <button class="btn btn-success">{{__('other.Apply changes')}}</button>
                </form>
            @endif

            <h2>{{__('form.Password')}}</h2>
            <form method="POST" action="{{route('cabinet.user.change_password',compact('user'))}}">
                @csrf
                @method('PUT')
                <x-form.InputWithType type="password" name="password_old" value="{{old('password_old')}}" title="{{__('form.Password')}}" placeholder="{{__('form.Enter password')}}" disabled=""/>
                <x-form.InputWithType type="password" name="password_new" value="{{old('password_new')}}" title="{{__('form.New password')}}" placeholder="{{__('form.Enter new password')}}" disabled=""/>
                <button class="btn btn-success">{{__('other.Apply changes')}}</button>
            </form>
        </div>
    </div>

@endsection
