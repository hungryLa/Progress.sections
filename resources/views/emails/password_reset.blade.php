<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
</head>
<body>
<h2>
    Пароль
</h2>
<br>
<p class="email__text" style="max-width: 900px;
            text-align: center;
            margin-top: 0;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 36px;">
    Здравствуйте!
    Вы получаете это электронное письмо, потому что мы получили
    запрос на сброс пароля для вашей учетной записи.
    сброс пароля
    Срок действия этой ссылки для сброса пароля истечет через 60 минут.
    Если вы не запрашивали сброс пароля, никаких дальнейших действий не требуется.
</p>
<a class="email__button" style="display: block;
            padding-top: 12px;
            padding-bottom: 12px;
            padding-right: 24px;
            padding-left: 24px;
            max-width: 148px;
            text-decoration: none;
            font-size: 16px;
            background-color: #92bb79;
            text-align: center;
            bottom: 24px;
            margin-top: 0;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 36px;
            transition: .25s all linear;
            color: white !important;
            border-radius: 8px;" href="{{route('password.reset',compact('token'))}}">Сбросить пароль</a>
</body>
</html>
