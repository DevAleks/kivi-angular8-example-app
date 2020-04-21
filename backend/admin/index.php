<?php

session_cache_limiter('private');
session_cache_expire(360);
session_start();

require("logpas/page.inc");
$rul=autoriz();
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
  
	echo "<span class='zag1'>Одминко :)</span><br><br>
	<p>
	<span class='pos8'>Пользователь : <b>".autoriz_username()."</b></span>
	</p>
	<p>
	<span class='pos5'><a class=link href='logout.php'>Выход из системы</a></span><br>
	<p>";	


//phpinfo(32);
}
elseif ($rul<1)
{
	header("location:login.php");
}
	
?>

</body>
</html>
