<?php
function autoriz ()
{	
	if (isset($_SESSION['rul']) && isset($_COOKIE['hash']))
	{		
		if ($_SESSION['rul']!='' && $_COOKIE['hash']==md5(session_id()))
		{
			$rul=$_SESSION['rul'];
		}
		else
		{
			$rul='0';
			header("location:login.php?error=2");
		}		
	}	
	elseif ((!isset($_SESSION['rul']) || !isset($_COOKIE['hash'])) || (!$_SESSION['rul'] || !$_COOKIE['hash']))	
	{
		$rul='0';
		header("location:login.php?error=1");
	}
	return($rul);
}
function autoriz_username ()
{
	require("connect.php");
	$zap_username="SELECT username FROM `autorization` WHERE login='".$_SESSION['login']."'";
	$rez_username = $mysqli->query($zap_username);
	@$row = $rez_username->fetch_row();
	$username = strval($row[0]);
	return($username);	
}
function user_id ()
{
	require("connect.php");
	$zap_user_id="SELECT id_autoriz FROM autorization WHERE login='".$_SESSION['login']."'";
	$rez_user_id = $mysqli->query($zap_user_id);
	@$row = $rez_user_id->fetch_row(); 
	$user_id = strval($row[0]);
	return($user_id);	
}
function zay_id_for_managers ($datetime, $br)
{
	if ($br==1)	$br2='<br>';
	$datetime_m=explode(' ', $datetime);
	$date_m=explode('-',$datetime_m[0]);
	$time_m=explode(':',$datetime_m[1]);		
	$tab_id=$time_m[0].$time_m[1].$time_m[2]."/$br2".$date_m[2].$date_m[1].$date_m[0];
	return($tab_id);
}
?>
