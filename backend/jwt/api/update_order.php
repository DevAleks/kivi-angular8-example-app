<?php
// требуемые заголовки 
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, PATCH, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    return 0;
 }

// Переменная для кода ответа сервер
$httpResponseCode = 500;

// Переменная для текста ответа сервера если сломалось что-то неизвестное
$answer = '{"message": "Unknown error"}';

// Показ ошибок в ответе сервера (включено если 1)
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

// требуется для кодирования веб-токена JSON 
include_once 'config/core.php';
include_once '../libs/php-jwt-master/src/BeforeValidException.php';
include_once '../libs/php-jwt-master/src/ExpiredException.php';
include_once '../libs/php-jwt-master/src/SignatureInvalidException.php';
include_once '../libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

// получаем jwt 
$jwt = isset($_GET['auth']) ? $_GET['auth'] : "";

// если JWT не пуст 
if($jwt) {
 
    try {

        // декодирование jwt 
        $decoded = JWT::decode($jwt, $key, array('HS256'));

        // если декодирование выполнено успешно, и метод try не выдал Exception, 
        // то подключаемся к БД получения изменяемого заказа и его изменения

        // файлы, необходимые для подключения к базе данных 
        include_once 'config/database.php';
        include_once 'objects/order.php';

        // получаем соединение с базой данных 
        $database = new Database();
        $db = $database->getConnection();
            
        // создание объекта 'Order' 
        $order = new Order($db);     

        // проверяем наличие id изменяемого заказа и отправляем его во фронтенд
        if (isset($_GET['get_id']) && $_GET['get_id'] > 0 && !isset($_GET['update_id'])) {       

            // установим id заказа для удаления 
            $order->order_id = $_GET['get_id'];

            // изменение заказа 
            if ($stmt = $order->getOrder()) {            

                // получаем содержимое таблицы 
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

                    // извлекаем строку 
                    extract($row);

                    $order_for_update = array(
                        "typeofact" => $order_typeofact,
                        "name" => $order_name,
                        "phone" => $order_phone,
                        "email" => $order_email,
                        "promo" => $order_promo,
                        "text" => $order_text   
                    );

                }

                // устанавливаем код ответа 
                $httpResponseCode = 200;
                
                // выводим данные о заказах в формате JSON  
                $answer = json_encode($order_for_update);
            }

            // Если заказ не найден
            else {

                // устанавливаем код ответа 
                $httpResponseCode = 400;
            
                // покажем сообщение о том, что изменить заказ не удалось 
                $answer = json_encode(array("message" => "Неизвестная ошибка, заказ не изменен"));            
            }            

        }

        // получаем данные для изменения заказа
        else if (isset($_GET['update_id']) && $_GET['update_id'] > 0 && !isset($_GET['get_id'])) {

            // получаем данные 
            $data = json_decode(file_get_contents("php://input"));

            // устанавливаем значения для записи в БД
            $order->order_id = $data->id;
            $order->order_typeofact = $data->typeofact;
            $order->order_name = $data->name;
            $order->order_phone = $data->phone;
            $order->order_email = $data->email;
            $order->order_promo = $data->promo;
            $order->order_text = $data->text;                        

            // создание нового заказа c проверкой наличия необходимых значений
            if (
                !empty($order->order_name) &&
                !empty($order->order_phone) &&
                !empty($order->order_typeofact) &&
                !empty($order->order_text) &&
                $order->updateOrder()
            ) {
                // устанавливаем код ответа 
                $httpResponseCode = 200;
                    
                // выводим данные о заказах в формате JSON  
                $answer = json_encode(array(
                    "message" => "An order ".$_GET['update_id']." was successfully updated"
                ));
            }
    
            // сообщение, если не удаётся создать новый заказ 
            else {    
                // устанавливаем код ответа 
                $httpResponseCode = 400;
            
                // покажем сообщение о том, что создать новый заказ не удалось 
                $answer = json_encode(array("message" => "Can't update an order"));
            }
          

        } 

        // Если get_id и update_id заказа не найдены
        else {

            // устанавливаем код ответа 
            $httpResponseCode = 400;
        
            // покажем сообщение о том, что изменить заказ не удалось 
            $answer = json_encode(array("message" => "Id изменяемого заказа не существует или он не корректный"));
        
        }

    }

    // если декодирование не удалось, это означает, что JWT является недействительным 
    catch (Exception $e){
    
        // код ответа 
        $httpResponseCode = 401;
    
        // сообщение об ошибке 
        $answer = json_encode(array(
            "message" => "Доступ закрыт, JWT не действителен",
            "error" => $e->getMessage()
        ));
    }    

}
// показать сообщение об ошибке, если jwt пуст 
else {
 
    // код ответа 
    $httpResponseCode = 401;
 
    // сообщить пользователю что доступ запрещен 
    $answer = json_encode(array("message" => "Доступ закрыт, JWT пуст"));
} 

http_response_code($httpResponseCode);

echo $answer;
