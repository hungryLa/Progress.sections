<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
</head>
<body>
<h2>
    {{$data['user']->full_name}},мы рады, что ты с нами! Ниже приведены данные вашего аккаунта:
</h2>
<br>
<h3>Роль: </h3>
<p>{{__('form.'.$data['user']->role)}}</p>
<h3>Email: </h3>
<p>{{$data['user']->email}}</p>
<h3>Password: </h3>
<p>{{$data['password']}}</p>
<a href="{{url($data['url'])}}" class="btn btn-success">{{__('other.Confirm Email')}}</a>

<p>{{$data['url']}}</p>
</body>
</html>
