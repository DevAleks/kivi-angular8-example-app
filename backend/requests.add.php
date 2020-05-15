<?php
header('Access-Control-Allow-Origin: http://localhost:4200'); 
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

// Получаем данные формы topForm из приложения
$formbt = json_decode(file_get_contents('php://input'), true);
   
if(isset($formbt['phone']) && isset($formbt['typeofact']) && isset($formbt['typeofform']))
{
    // Обрабатываем и отправляем обратно в приложение ОБЯЗАТЕЛЬНЫЕ данные из формы 
    $formbt_back['phone'] = 'Телефон: '.$formbt['phone'];    
    $formbt_back['typeofact'] = 'Тип активности: '.$formbt['typeofact'];
    $formbt_back['typeofform'] = $formbt['typeofform']; // Тип формы
    $formbt_back['status'] = false; // Статус ошибки запроса в БД   
    
    // Обрабатываем и отправляем обратно в приложение НЕОБЯЗАТЕЛЬНЫЕ данные из формы,
    // если они есть
    if (isset($formbt['name'])) {
      $formbt_back['name'] = 'Имя: '.$formbt['name']; 
    } else { 
      $formbt['name'] = ''; 
    }
    
    if (isset($formbt['email'])) {
      $formbt_back['email'] = 'Email: '.$formbt['email'];
    } else {
      $formbt['email'] = '';
    }
    
    if (isset($formbt['promo'])) {
      $formbt_back['promo'] = 'Promo: '.$formbt['promo'];
    } else {
      $formbt['promo'] = '';
    }   

    if (isset($formbt['text'])) {
      $formbt_back['text'] = 'Вопрос: '.$formbt['text']; 
    } else {
      $formbt['text'] = '';
    }      

    $mysqli = new mysqli("mysql", "root", "root", "kiviapp");

    // Обработка ошибки соединения с БД
    if (mysqli_connect_errno()) {
      echo json_encode ("Ошибка подключения к БД", JSON_UNESCAPED_UNICODE);
      error_log(mysqli_connect_error());
    }
    
    // Запись в БД 
    $query = "INSERT INTO orders (order_form_type, order_typeofact, order_name, order_phone, order_email, order_promo, order_text) VALUES(
      '".$formbt['typeofform']."', 
      '".$formbt['typeofact']."', 
      '".$formbt['name']."', 
      '".$formbt['phone']."', 
      '".$formbt['email']."', 
      '".$formbt['promo']."', 
      '".$formbt['text']."');";     
  
    // Обработка ошибки запроса в Бд
    $mysqli->query($query);
    if ($mysqli->error) {
      $formbt_back['status'] = true;
    }
   
    //Отправка ответа сервера в приложение  
    echo json_encode($formbt_back);
   
    $mysqli->close();
}
else
{  
    echo "Веденные данные некорректны";
}
    