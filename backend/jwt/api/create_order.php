<?php
// требуемые заголовки 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Expose-Headers: Content-Length, X-JSON");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: *");

/*
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
*/

/*
header("Access-Control-Allow-Origin: http://localhost:4200");
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
*/

// подключение к БД 
// файлы, необходимые для подключения к базе данных 
include_once 'config/database.php';
include_once 'objects/order.php';
 
// получаем соединение с базой данных 
$database = new Database();
$db = $database->getConnection();
 
// создание объекта 'Order' 
$order = new Order($db);
 
// отправляемые данные будут здесь

// получаем данные 
$data = json_decode(file_get_contents("php://input"));

// устанавливаем значения 
$order->order_form_type = $data->typeofform;
$order->order_typeofact = $data->typeofact;
$order->order_name = $data->name;
$order->order_phone = $data->phone;
$order->order_email = $data->email;
$order->order_promo = $data->promo;
$order->order_text = $data->text;

// Проверка! + кастыл чтоб не было ошибки 
//echo json_encode(array("message" => "A JSON response was delivered to the backend"));

// здесь будет метод create()

// создание нового заказа 
if ($order->create()) {
    // устанавливаем код ответа 
    http_response_code(200);
 
    // покажем сообщение о том, что новый заказ был создан 
    echo json_encode(array("message" => "A new order was successfully created"));
}
 
// сообщение, если не удаётся создать новый заказ 
else {
     // устанавливаем код ответа 
    http_response_code(400);
 
    // покажем сообщение о том, что создать новый заказ не удалось 
    echo json_encode(array("message" => "Can't create a new order"));
}



?>
