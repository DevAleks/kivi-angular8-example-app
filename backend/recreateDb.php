<?php
require("logpas/connect.php"); // MySQL connect 

// Пересоздаем чистую таблицу orders
$rez=mysql_query('DROP TABLE orders');

$rez=mysql_query("
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
");

?>