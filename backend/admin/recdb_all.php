<?php
require("logpas/connect.php"); // MySQL connect 

// Уничтожаем таблицы кроме autorization

$rez=mysql_query('DROP TABLE autorization');

$rez=mysql_query(" 
CREATE TABLE IF NOT EXISTS autorization (
  id_autoriz smallint(8) unsigned NOT NULL auto_increment,
  login varchar(32) DEFAULT '',
  passwd varchar(32) DEFAULT '',
  type_autoriz tinyint(1) DEFAULT '0',
  username varchar(50) DEFAULT '',
  regist_datetime datetime,
  regist_username varchar(50) DEFAULT '',
  PRIMARY KEY (id_autoriz)
);
 ");
 
$rez=mysql_query("INSERT INTO autorization (login, passwd, type_autoriz, username, regist_datetime, regist_username) VALUES('21232f297a57a5a743894a0e4a801fc3', '1bbd886460827015e5d605ed44252251', '3', 'Администратор', '2011-10-02 14:50:42', 'admin');");

$rez=mysql_query('DROP TABLE zayavka');

$rez=mysql_query(" 
CREATE TABLE IF NOT EXISTS zayavka (
	id_zayavka smallint(8) unsigned NOT NULL auto_increment,
	zay_stat_adm tinyint(2) DEFAULT '0',
	zay_stat_manager tinyint(2) DEFAULT '0',
	zay_comments_adm_man blob DEFAULT '',
	zay_stat_otrab tinyint(2) DEFAULT '0',
	zay_datetime datetime,
	zay_prioritet tinyint(2) DEFAULT '0',
	zay_hidden_prioritet tinyint(2) DEFAULT '0',
	zay_zayavka blob DEFAULT '',
	zay_firma smallint(5) DEFAULT '0',
	zay_kto_prinal varchar(50) DEFAULT '',
	zay_kto_vedet varchar(50) DEFAULT '',
	zay_comments_adm blob DEFAULT '',
	zay_kto_obrabat tinyint(2) DEFAULT '0',
	zay_instrukt tinyint(2) DEFAULT '0',
	zay_commerc blob DEFAULT '',
	zay_status_commerc tinyint(1) DEFAULT '0',
	zay_last_kontakt date,	
  PRIMARY KEY (id_zayavka));
 ");

//ALTER TABLE zayavka MODIFY zay_last_kontakt datetime;

//ALTER TABLE zayavka ADD zay_last_kontakt date AFTER zay_status_commerc; 
//ALTER TABLE zayavka ADD zay_kto_vedet varchar(50) DEFAULT '' AFTER zay_kto_prinal; 

//INSERT INTO zayavka (zay_stat_adm, zay_stat_manager, zay_comments_adm_man, zay_stat_otrab, zay_datetime, zay_prioritet, zay_hidden_prioritet, zay_zayavka, zay_firma, zay_kto_prinal, zay_comments_adm, zay_kto_obrabat, zay_instrukt, zay_commerc, zay_status_commerc) VALUES("1", "2", "Комментарий Менеджеры - Админы", "3", "2011-04-26 21:25:29", "3", "2", "Текст заявки", "2", "Слава", "Комментарии админов", "2", "1", "Коммерческое предложение", "1");

//INSERT INTO zayavka (zay_stat_adm, zay_stat_manager, zay_comments_adm_man, zay_stat_otrab, zay_datetime, zay_prioritet, zay_hidden_prioritet, zay_zayavka, zay_firma, zay_kto_prinal, zay_comments_adm, zay_kto_obrabat, zay_instrukt, zay_commerc, zay_status_commerc) VALUES("3", "4", "Комментарий Менеджеры - Админы", "5", "2011-04-26 22:25:29", "7", "1", "Текст заявки", "1", "Артем", "Комментарии админов", "1", "2", "Коммерческое предложение", "2");


$rez=mysql_query('DROP TABLE firma');

$rez=mysql_query(" 
CREATE TABLE IF NOT EXISTS firma (
	id_firma smallint(8) unsigned NOT NULL auto_increment,
    frm_name varchar(200) DEFAULT '',
	frm_city varchar(30) DEFAULT '',
	frm_country varchar(30) DEFAULT '',
	frm_rekvizit blob DEFAULT '',
	frm_filepath varchar(100) DEFAULT '',
	frm_dop blob DEFAULT '',	
  PRIMARY KEY (id_firma));
 ");

//INSERT INTO firma (frm_name, frm_city, frm_country, frm_rekvizit, frm_filepath, frm_dop) VALUES("Фирма 1", "Санкт-Петербург", "Россия", "Реквизиты Фирмы 1", "Файл 1", "Дополнительное поле для Фирмы 1");

//INSERT INTO firma (frm_name, frm_city, frm_country, frm_rekvizit, frm_filepath, frm_dop) VALUES("Фирма 2", "Киев", "Украина", "Реквизиты Фирмы 2", "Файл 2", "Дополнительное поле для Фирмы 2");

//INSERT INTO firma (frm_name, frm_city, frm_country, frm_rekvizit, frm_filepath, frm_dop) VALUES("Фирма 3", "Москва", "Россия", "Реквизиты Фирмы 3", "Файл 3", "Дополнительное поле для Фирмы 3");

//INSERT INTO firma (frm_name, frm_city, frm_country, frm_rekvizit, frm_filepath, frm_dop) VALUES("Фирма 4", "Минск", "Беларусь", "Реквизиты Фирмы 4", "Файл 4", "Дополнительное поле для Фирмы 4");


$rez=mysql_query('DROP TABLE kontakt');

$rez=mysql_query(" 
CREATE TABLE IF NOT EXISTS kontakt (
	id_kontakt smallint(8) unsigned NOT NULL auto_increment,
    id_firma smallint(8) DEFAULT '0',
	kontakt_fio varchar(100) DEFAULT '',
	kontakt_data blob DEFAULT '',
	kontakt_comment blob DEFAULT '',	
  PRIMARY KEY (id_kontakt));
 ");


$rez=mysql_query('DROP TABLE otrabotka');

$rez=mysql_query(" 
CREATE TABLE IF NOT EXISTS otrabotka (
	id_otrabotka smallint(8) unsigned NOT NULL auto_increment,
    id_zayavka smallint(8) DEFAULT '0',
	id_otrabotchik smallint(5) DEFAULT '0',
	id_instrukt smallint(8) DEFAULT '0',
	otrabotka_status tinyint(1) DEFAULT '0',
	otrabotka_result blob DEFAULT '',	
	instrukt_type tinyint(1) DEFAULT '0',
  PRIMARY KEY (id_otrabotka));
 ");


$rez=mysql_query('DROP TABLE instrukt');

$rez=mysql_query(" 
CREATE TABLE IF NOT EXISTS instrukt (
	id_instrukt smallint(8) unsigned NOT NULL auto_increment,
    instrukt_data blob DEFAULT '',
	instrukt_datetime datetime,
  PRIMARY KEY (id_instrukt));
 ");
 
$rez=mysql_query('DROP TABLE logs');

$rez=mysql_query(" 
CREATE TABLE IF NOT EXISTS logs (
	id_logs smallint(8) unsigned NOT NULL auto_increment,
    id_zayavka smallint(8) DEFAULT '0',
	logs_datetime datetime,
	logs_username varchar(50) DEFAULT '',
  PRIMARY KEY (id_logs));
 "); 

?>