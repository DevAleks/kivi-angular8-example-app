<?php

session_start();
session_cache_expire(3);
/*
session_cache_limiter('private');
ini_set('session.gc_maxlifetime', 180);
ini_set('session.cookie_lifetime', 0);
session_set_cookie_params(0);
*/
/*
$hours = date('H')+3;
$m_s = date("i:s");
$_SESSION['time'] = $hours.":".$m_s;
*/

require("logpas/page.inc");
//$rul=autoriz();
$rul = $_SESSION['rul'];
if ($rul>0)
{
	require("logpas/connect.php"); // MySQL connect
	require("functions/datetime.inc"); // Дата и время
?>	
	<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
	<html xmlns='http://www.w3.org/1999/xhtml'>
	<head>
	<meta http-equiv='Content-Type' content='text/html; charset=windows-1251' />
	<link href="style.css" rel="stylesheet" type="text/css">
	<title>Панель администрирования</title>
	<script src="js/checkall.js" type="text/javascript"></script>
	</head>
	<body>

<?php
  
	echo "<span class='zag1'>Одминко :)</span><br><br>";
	echo "rul = ".$rul."<br>";
	//echo "s_SESSION[time] = ".$_SESSION['time']."<br>";
	echo "
	<p>
	<span class='pos8'>Пользователь : <b>".autoriz_username()."</b></span>
	</p>
	<p>
	<span class='pos5'><a class=link href='logout.php'>Выход из системы</a></span><br>
	<p>
	";	


phpinfo();
}
elseif ($rul<1)
{
	header("location:login.php");
}
	
?>

</body>
</html>
