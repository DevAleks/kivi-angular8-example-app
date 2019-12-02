<?php
//if (version_compare(PHP_VERSION, '7.0.0','>=')) include ('func/mysql.php');
$host='localhost';
$user='frontuser';
$passwd='qazxsw';
$db_name='kiviapp';
$connect=mysqli_connect($host, $user, $passwd, $db_name) or die("нет подключения к БД $db_name");
//mysqli_select_db($db_name, $connect) or die("не выбрать БД kiviapp");
?>
