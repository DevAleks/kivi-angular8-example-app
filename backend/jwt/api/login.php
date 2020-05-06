<?php
// заголовки 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  return 0;
}


// http://localhost:4200
// здесь будет соединение с БД

// файлы необходимые для соединения с БД 
include_once 'config/database.php';
include_once 'objects/user.php';
 
// получаем соединение с базой данных 
$database = new Database();
$db = $database->getConnection();
 
// создание объекта 'User' 
$user = new User($db);
 
// получаем данные 
$data = json_decode(file_get_contents("php://input"));
 
// устанавливаем значения 
$user->email = $data->email;
$email_exists = $user->emailExists();
 
// файлы для JWT будут здесь
// подключение файлов jwt 
include_once 'config/core.php';
include_once '../libs/php-jwt-master/src/BeforeValidException.php';
include_once '../libs/php-jwt-master/src/ExpiredException.php';
include_once '../libs/php-jwt-master/src/SignatureInvalidException.php';
include_once '../libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;
 
// существует ли электронная почта и соответствует ли пароль тому, что находится в базе данных 
if ( $email_exists && password_verify($data->password, $user->password) ) {
 
    $token = array(
       "iss" => $iss,
       "aud" => $aud,
       "iat" => $iat,
       "nbf" => $nbf,
       "exp" => $exp,
       "data" => array(
           "id" => $user->id,
           "firstname" => $user->firstname,
           "lastname" => $user->lastname,
           "email" => $user->email
       )
    );
 
    // код ответа 
    http_response_code(200);
 
    //$expiresIn='"'.strval($expired_after).'"';

    // создание jwt 
    $jwt = JWT::encode($token, $key);
    echo json_encode(
        array(           
            "displayName" => "",
            "email" => $user->email,
            "expiresIn" => $expired_after,
            "jwt" => $jwt,
            "kind" => "VerifyPasswordResponse",
            "message" => "Успешный вход в систему",
            "localId" => "123localId",
            "registered" => true,
            "exp" => $exp                       
        )
    );
 
}
 
// Если электронная почта не существует или пароль не совпадает, 
// сообщим пользователю, что он не может войти в систему 
else {
 
  // код ответа 
  http_response_code(401);

  // сказать пользователю что войти не удалось 
  //echo json_encode(array("message" => "Ошибка входа:".$email_exists));
  
  // Возвращаем ошибку INVALID_EMAIL
  if(!$email_exists) {
    echo json_encode(array("message" => "INVALID_EMAIL"));
  }
  // Возвращаем ошибку INVALID_PASSWORD
  elseif(!password_verify($data->password, $user->password)) {
    echo json_encode(array("message" => "INVALID_PASSWORD"));
  }

}
