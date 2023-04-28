@extends('layouts.app')

@section('content')
     <div>
         <a href="{{route('register')}}">Зарегистрироваться</a>
         <a href="{{route('login')}}">Авторизироваться</a>
     </div>
@endsection
