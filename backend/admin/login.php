<?php

if ((isset($_POST['login']) && isset($_POST['paswd'])) && (strlen($_POST['login'])<=12 && strlen($_POST['paswd'])<=20) && (preg_match('/[0-9a-zA-Z]{4,12}/',$_POST['login']) && preg_match('/[0-9a-zA-Zа-яА-Я]{8,20}/',$_POST['paswd'])))
{	
	$hash_pas=md5($_POST['paswd']);
	$hash_login=md5($_POST['login']);	
	$zap1="SELECT type_autoriz FROM autorization WHERE login='".$hash_login."' AND passwd='".$hash_pas."'";	
	require("logpas/connect.php");
	$rez1 = $mysqli->query($zap1);
	@$row = $rez1->fetch_row();
	$rul2 = strval($row[0]);

	$rez1->close();

	$mysqli->close();

	if ($rul2!='')
	{		
		session_start();
		$hash=md5(session_id());
		setcookie('hash', $hash, (time()+12000));
		$_SESSION['rul']=$rul2;
		$_SESSION['login']=$hash_login;
		header("location:index.php");
	}
	else
	{
		$error="<span style='color:red;'><b>Имя пользователя или пароль введены неверно. Повторите ввод.</b></span>";
	} 	
}
elseif (isset($_POST['login']) && isset($_POST['paswd'])) 
{$error="<span class=col_red><b>Имя пользователя или пароль введены неверно. Повторите ввод.</b></span>";}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1251" />
<link href="style.css" rel="stylesheet" type="text/css">
<title>Авторизация пользователей</title>
</head>
<body>

<?php
if (isset($_GET['error']))
{
	switch($_GET['error'])
	{
	case 1:
		echo "<span class=col_red><b>Авторизируйтесь!</b></span>";
		break;
	case 2:
		echo "<span class=col_red><b>Разрешите вашему браузеру прием cookie-файлов и повторите авторизацию!</b></span>";
		break;
	}
}
echo "<div style=\"padding-top:220px;\" align=center>
".$error."<br>
<form method='post' name='login_page' action='login.php'>
<table border=0 align=center>
<tr><td align=center colspan=2><b>&nbsp;Форма авторизации</b></td></tr>
<tr><td align=right>&nbsp;Пользователь:</td><td align=left>&nbsp;<input type='text' name='login' size=13 maxlength=12></td></tr>
<tr><td align=right>&nbsp;Пароль:</td><td align=left>&nbsp;<input type='password' name='paswd' size=24 maxlength=20></td></tr>
<tr><td align=right colspan=2><input type='submit' name='login_p' value='Ок'></td></tr>
</table>
</form></div>
";
?> 
