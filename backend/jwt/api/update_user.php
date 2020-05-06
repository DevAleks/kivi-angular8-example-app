<?php
// required headers 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// требуется для кодирования веб-токена JSON 
include_once 'config/core.php';
include_once '../libs/php-jwt-master/src/BeforeValidException.php';
include_once '../libs/php-jwt-master/src/ExpiredException.php';
include_once '../libs/php-jwt-master/src/SignatureInvalidException.php';
include_once '../libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;
 
// файлы, необходимые для подключения к базе данных 
include_once 'config/database.php';
include_once 'objects/user.php';
 
// получаем соединение с базой данных 
$database = new Database();
$db = $database->getConnection();
 
// создание объекта 'User' 
$user = new User($db);
 
// получаем данные 
$data = json_decode(file_get_contents("php://input"));
 
// получаем jwt 
$jwt=isset($data->jwt) ? $data->jwt : "";
 
// если JWT не пуст 
if($jwt) {
 
    // если декодирование выполнено успешно, показать данные пользователя 
    try {
 
        // декодирование jwt 
        $decoded = JWT::decode($jwt, $key, array('HS256'));
 
        // Нам нужно установить отправленные данные (через форму HTML) в свойствах объекта пользователя 
        $user->firstname = $data->firstname;
        $user->lastname = $data->lastname;
        $user->email = $data->email;
        $user->password = $data->password;
        $user->id = $decoded->data->id;
        
        // создание пользователя 
        if($user->update()) {
            // сгенерировать заново JWT здесь 

            // нам нужно заново сгенерировать JWT, потому что данные пользователя могут отличаться 
            $token = array(
                "iss" => $iss,
                "aud" => $aud,
                "iat" => $iat,
                "nbf" => $nbf,
                "data" => array(
                    "id" => $user->id,
                    "firstname" => $user->firstname,
                    "lastname" => $user->lastname,
                    "email" => $user->email
                )
            );
            $jwt = JWT::encode($token, $key);
            
            // код ответа 
            http_response_code(200);
            
            // ответ в формате JSON 
            echo json_encode(
                array(
                    "message" => "Пользователь был обновлён",
                    "jwt" => $jwt
                )
            );

        }
        
        // сообщение, если не удается обновить пользователя 
        else {
            // код ответа 
            http_response_code(401);
        
            // показать сообщение об ошибке 
            echo json_encode(array("message" => "Невозможно обновить пользователя."));
        }
    }
 
    // если декодирование не удалось, это означает, что JWT является недействительным 
    catch (Exception $e){
    
        // код ответа 
        http_response_code(401);
    
        // сообщение об ошибке 
        echo json_encode(array(
            "message" => "Доступ закрыт",
            "error" => $e->getMessage()
        ));
    }
}

// показать сообщение об ошибке, если jwt пуст 
else {
 
    // код ответа 
    http_response_code(401);
 
    // сообщить пользователю что доступ запрещен 
    echo json_encode(array("message" => "Доступ закрыт."));?>
