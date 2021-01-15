<?php
header('Access-Control-Allow-Origin: http://localhost:4200'); 
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

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

// Получаем данные формы topForm из приложения
$formbt = json_decode(file_get_contents('php://input'), true);

if($formbt) {  

  try {

    // файлы, необходимые для подключения к базе данных 
    include_once 'jwt/api/config/database.php';
    include_once 'jwt/api/objects/order.php';

    // получаем соединение с базой данных 
    $database = new Database();
    $db = $database->getConnection();

    // создание объекта 'Order' 
    $order = new Order($db);  
    
    // устанавливаем значения для записи в БД
    $order->order_form_type = $formbt['typeOfForm'];
    $order->order_typeOfAct = $formbt['typeOfAct'];
    $order->order_phone = $formbt['phone'];
    $order->order_name = $formbt['name'];
    $order->order_email = $formbt['email'];
    $order->order_promo = $formbt['promo'];
    $order->order_text = $formbt['text'];

    // создание нового заказа c проверкой наличия необходимых значений
    if (
      !empty($order->order_phone) &&
      !empty($order->order_typeOfAct) &&
      !empty($order->order_form_type) &&
      $order->createOrderFront()
    ) {

      // устанавливаем код ответа 
      $httpResponseCode = 200;

      // Готовим данные для ответа на фронтенд, если заказ успешно создан 
      // Обязательные 
      $formbt_back['phone'] = 'Телефон: '.$formbt['phone'];    
      $formbt_back['typeOfAct'] = 'Тип активности: '.$formbt['typeOfAct'];
      $formbt_back['typeOfForm'] = $formbt['typeOfForm']; // Тип формы
      $formbt_back['status'] = false; // Статус ошибки запроса в БД   

      // Необязательные
      $formbt_back['name'] = isset($formbt['name']) ? 'Имя: '.$formbt['name'] : '';
      $formbt_back['email'] = isset($formbt['email']) ? 'Email: '.$formbt['email'] : '';
      $formbt_back['promo'] = isset($formbt['promo']) ? 'Promo: '.$formbt['promo'] : '';
      $formbt_back['text'] = isset($formbt['text']) ? 'Вопрос: '.$formbt['text'] : '';

      // Отправляем ответ на фронтенд
      $answer = json_encode($formbt_back);
    }

    // сообщение, если не удаётся создать новый заказ 
    else {    
      // устанавливаем код ответа 
      $httpResponseCode = 400;

      // покажем сообщение о том, что создать новый заказ не удалось 
      $answer = json_encode(array("message" => "Не удалось создать заказ"));
    }    

  }
  catch (Exception $e){
    
    // код ответа 
    $httpResponseCode = 400;

    // сообщение об ошибке 
    $answer = json_encode(array(
        "message" => "Отправка данных из формы не удалась",
        "error" => $e->getMessage()
    ));
  } 

}

// показать сообщение об ошибке, если данных из формы нет
else {
 
  // код ответа 
  $httpResponseCode = 400;

  // сообщить пользователю что доступ запрещен 
  $answer = json_encode(array("message" => "Заказ не создан. Не удалось получить данные из фронтенд."));
} 

http_response_code($httpResponseCode);

echo $answer;
    