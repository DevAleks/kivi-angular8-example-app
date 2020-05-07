<?php
// показывать сообщения об ошибках 
error_reporting(E_ALL);
 
// установить часовой пояс по умолчанию 
date_default_timezone_set('Europe/Moscow');

// переменные, используемые для JWT 
$key = "your_secret_key";
$iss = "http://any-site.org";
$aud = "http://any-site.com";
$iat = 1356999524;
$nbf = 1357000000;

// добавляем время окончания жизни токена
$expired_after = 3600; // время жизни токена в секундах с момента авторизации
$exp = time() + $expired_after;
