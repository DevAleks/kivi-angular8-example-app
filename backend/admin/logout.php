<?php
setcookie('hash', '', (time()-10000));
$_SESSION = array(); 
session_unset();
session_write_close();
header("location:login.php");	
?> 