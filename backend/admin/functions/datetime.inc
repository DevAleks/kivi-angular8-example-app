<?php

function data_format_conv ($data)
{
	$data_m=explode('-',$data);
	$data=$data_m[2]."-".$data_m[1]."-".$data_m[0];
	return ($data);	
}
function datatime_format_conv ($datatime)
{
	$datatime_m=explode(' ',$datatime);
	$data_m=explode('-',$datatime_m[0]);
	$data=$data_m[2]."-".$data_m[1]."-".$data_m[0];
	/*
	$time_m=explode(':',$datatime_m[1]);
	$time=$time_m[2].":".$time_m[1].":".$time_m[0];
	$datatime=$data." ".$time;
	*/
	$datatime=$datatime_m[1]." ".$data;
	return ($datatime);	
}
function datat_format_conv ($datatime)
{
	$datatime_m=explode(' ',$datatime);
	$data_m=explode('-',$datatime_m[0]);
	$data=$data_m[2]."-".$data_m[1]."-".$data_m[0];
	return ($data);	
}
?>