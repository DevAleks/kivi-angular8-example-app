<?php

// Отображение ошибок
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL); 

$mysqli = new mysqli("mysql", "root", "root", "kiviapp");

// Обработка ошибки соединения с БД
if (mysqli_connect_errno()) {
  echo "Ошибка подключения к БД: %s\n".mysqli_connect_error();
}

// Создаем таблицу kiviapp        
$query="
CREATE TABLE IF NOT EXISTS orders (
  order_id smallint(6) unsigned NOT NULL auto_increment,
  order_form_type tinyint(2) DEFAULT '0',
  order_datetime datetime,
  order_typeofact varchar(20) DEFAULT '',  
  order_name varchar(30) DEFAULT '',
  order_phone varchar(15) DEFAULT '',
  order_email varchar(64) DEFAULT '',
  order_promo varchar(30) DEFAULT '',
  order_text varchar(500) DEFAULT '',
  PRIMARY KEY (order_id));
";

// Обработка ошибки запроса в Бд
$mysqli->query($query);
if ($mysqli->error) {
  echo "Connection NOT ok! ", $mysqli->error;
} else {
  echo "Connection ok!";
}

$mysqli->close();
