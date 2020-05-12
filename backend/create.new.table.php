<?php

// Отображение ошибок
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL); 

$mysqli = new mysqli("mysql", "root", "root");

// Обработка ошибки соединения с БД
if (mysqli_connect_errno()) {
  echo "Ошибка подключения к БД: %s\n".mysqli_connect_error();
  echo "<br>";
}

// Создаем БД kiviapp
$query = "CREATE DATABASE kiviapp;";

$mysqli->query($query);
if ($mysqli->error) {
  echo "Connection NOT ok! ", $mysqli->error;
  echo "<br>";
} else {
  echo 'Succefully created "kiviapp" DB!<br>';
}

// Выбираем БД kiviapp
$query = "USE kiviapp;";

$mysqli->query($query);
if ($mysqli->error) {
  echo "Connection NOT ok! ", $mysqli->error;
  echo "<br>";
} else {
  echo 'Succefully selected "kiviapp" DB!<br>';
}

// Создаем таблицу orders
$query = "CREATE TABLE IF NOT EXISTS orders (
  order_id smallint(6) unsigned NOT NULL auto_increment,
  order_form_type tinyint(2) DEFAULT '0',
  order_typeofact varchar(30) DEFAULT '',  
  order_name varchar(30) DEFAULT '',
  order_phone varchar(20) DEFAULT '',
  order_email varchar(64) DEFAULT '',
  order_promo varchar(30) DEFAULT '',
  order_text varchar(500) DEFAULT '',
  order_created datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  order_modified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (order_id));
";

$mysqli->query($query);
if ($mysqli->error) {
  echo "Connection NOT ok! ", $mysqli->error;
  echo "<br>";
} else {
  echo 'Succefully created "orders" table!<br>';
}

// Создаем таблицу users
$query = "
CREATE TABLE IF NOT EXISTS users (
  id int(11) unsigned NOT NULL auto_increment,
  firstname varchar(256) NOT NULL,
  lastname varchar(256) NOT NULL,
  email varchar(256) NOT NULL,
  password varchar(2048) NOT NULL,
  created datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id));  
";

$mysqli->query($query);
if ($mysqli->error) {
  echo "Connection NOT ok! ", $mysqli->error;
  echo "<br>";
} else {
  echo 'Succefully created "users" table!<br>';
}


// Создаем запись администратора
$query = 'INSERT INTO users (
  firstname, 
  lastname, 
  email, 
  password
  ) VALUES (
    "Ivan", 
    "Ivanov", 
    "admin@kiviapp.com", 
    "$2y$10$oSl06bCbW0Ci01n0pecw0etI18wI6Jm6f2i8ubIrtlQLd43.YQs2O");
';
       

$mysqli->query($query);
if ($mysqli->error) {
  echo "The administrator user creation is NOT ok! ", $mysqli->error;
  echo "<br>";
} else {
  echo 'Succefully created the administrator user!<br>';
}


/*
ALTER TABLE orders ADD order_created datetime NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER order_text; 
ALTER TABLE orders ADD order_modified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER order_created;



ALTER TABLE autorization ADD created datetime NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER regist_username; 
ALTER TABLE autorization ADD modified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created;

ALTER TABLE autorization MODIFY id_autoriz int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE autorization ADD firstname varchar(256) NOT NULL AFTER username;
ALTER TABLE autorization ADD lastname varchar(256) NOT NULL AFTER firstname;

ALTER TABLE autorization ADD email varchar(256) NOT NULL AFTER lastname;
ALTER TABLE autorization ADD password varchar(2048) NOT NULL AFTER email;

RENAME TABLE autorization TO users;
*/

$mysqli->close();
