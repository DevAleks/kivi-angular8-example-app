<?php

function prioritet_view ($prioritet, $rul)
{	
       	if ($rul==3)
		{
			switch ($prioritet)
			{
				case 0:
					$sel0='selected';			
					break;
				case 1:
					$sel1='selected';
					break;
				case 2:
					$sel2='selected';			
					break;
				case 3:
					$sel3='selected';
					break;
				case 4:
					$sel4='selected';			
					break;
			}
			echo "
			<select name='zay_prioritet'>\n
				<option value='0' $sel0>Самый высокий\n</option>
				<option value='1' $sel1>Высокий\n</option>
				<option value='2' $sel2>Средний\n</option>
				<option value='3' $sel3>Низкий\n</option>
				<option value='4' $sel4>Самый низкий\n</option>			
			</select>";
		}
		elseif ($rul==2 xor $rul==1)
		{
			switch ($prioritet)
			{
				case 0:
					$sel='Самый высокий';			
					break;
				case 1:
					$sel='Высокий';
					break;
				case 2:
					$sel='Средний';			
					break;
				case 3:
					$sel='Низкий';
					break;
				case 4:
					$sel='Самый низкий';			
					break;
			}
			echo "<b>$sel</b>";	
		}
}
function prioritet_hidden_view ($prioritet)
{	
		switch ($prioritet)
		{
			case 0:
				$sel0='selected';			
				break;
			case 1:
				$sel1='selected';
				break;
			case 2:
				$sel2='selected';			
				break;
			case 3:
				$sel3='selected';			
				break;
		}
		echo "
		<select name='zay_hidden_prioritet'>\n
		<option value='0' $sel0>Snabzenec\n</option>
		<option value='1' $sel1>GruzSnab\n</option>
		<option value='3' $sel3>WorldSnab\n</option>
		<option value='2' $sel2>Скрыть заявку\n</option>		
		</select>";
}
function firma_obr_view ($firma_obr)
{	
		switch ($firma_obr)
		{
			case 0:
				$sel0='selected';			
				break;
			case 1:
				$sel1='selected';
				break;
			case 2:
				$sel2='selected';			
				break;
			case 3:
				$sel3='selected';			
				break;
			case 4:
				$sel4='selected';			
				break;
			case 5:
				$sel5='selected';			
				break;
			case 6:
				$sel6='selected';			
				break;
		}
		echo "
		<select name='zay_firma_obr'>\n
		<option value='0' $sel0>LiderGruz\n</option>
		<option value='1' $sel1>Zavod-Leader\n</option>
		<option value='2' $sel2>SuperSkoba\n</option>
		<option value='3' $sel3>MGSnab\n</option>
		<option value='4' $sel4>Снабженец\n</option>	
		<option value='5' $sel5>Worldsnab\n</option>	
		<option value='6' $sel6>Иное (см. в комментарий)\n</option>					
		</select>";
}

function status_view ($status)
{	
		switch ($status)
		{
			case 1:
				$sel1='selected';
				break;
			case 2:
				$sel2='selected';			
				break;
			case 3:
				$sel3='selected';
				break;
			case 4:
				$sel4='selected';			
				break;
			case 5:
				$sel5='selected';
				break;
			case 6:
				$sel6='selected';			
				break;
			case 7:
				$sel7='selected';
				break;
			case 8:
				$sel8='selected';			
				break;
			case 9:
				$sel9='selected';
				break;					
			case 10:
				$sel10='selected';			
				break;
			case 11:
				$sel11='selected';
				break;
			case 12:
				$sel12='selected';			
				break;
			case 13:
				$sel13='selected';
				break;
			case 14:
				$sel14='selected';			
				break;
			case 15:
				$sel15='selected';
				break;	
			case 16:
				$sel16='selected';
				break;
			case 17:
				$sel17='selected';			
				break;
			case 18:
				$sel18='selected';
				break;	
			case 19:
				$sel19='selected';			
				break;
			case 20:
				$sel20='selected';
				break;	
			case 21:
				$sel21='selected';
				break;
			case 22:
				$sel22='selected';			
				break;
			case 23:
				$sel23='selected';
				break;
			default:
				$sel0='selected';		
				break;
		}	
		echo "		
		<option value='0' $sel0>Менеджер: добавлена новая заявка\n</option>
		<option value='1' $sel1>Админ: новая заявка обработана\n</option>
		<option value='19' $sel19>Закупщик: инструкция прочитана\n</option>		
    <option value='2' $sel2>Закупщик: заявка в поиске\n</option>
		<option value='20' $sel20>Закупщик: промежуточные результаты\n</option>
		<option value='6' $sel6>Закупщик: окончательные результаты\n</option>
		<option value='21' $sel21>Закупщик: необходима доп. информация от клиента\n</option>
		<option value='22' $sel22>Админ: необходима доп. информация от клиента\n</option>
		<option value='3' $sel3>Админ: промежуточные результаты, клиенту не озвучено\n</option>
		<option value='23' $sel23>Админ: окончательные результаты, клиенту не озвучено\n</option>
		<option value='18' $sel18>Менеджер: изменения в заявке\n</option>
		<option value='4' $sel4>Менеджер: клиенту озвучен промежуточный ответ\n</option>
		<option value='7' $sel7>Менеджер: клиенту озвучен окончательные ответ\n</option>
		<option value='8' $sel8>Менеджер: ожидание ответа клиента\n</option>
		<option value='9' $sel9>Менеджер: выставлен счет\n</option>
		<option value='10' $sel10>Менеджер: счет оплачен, ждем деньги\n</option>
		<option value='11' $sel11>Админ: деньги поступили, закупаем товар\n</option>
		<option value='12' $sel12>Админ: товар поставляется на склад\n</option>
		<option value='13' $sel13>Админ: отгрузка товара\n</option>
		<option value='14' $sel14>Менеджер: рекламации\n</option>
		<option value='15' $sel15>Админ: сделка закрыта\n</option>
		<option value='16' $sel16>Менеджер: отказ клиента\n</option>
		<option value='17' $sel17>Менеджер: не ответили клиенту, просроченная заявка\n</option>


		</select>";
		//Непонятный статус:
		//<option value='5' $sel5>Промежуточный ответ частично не озвучен\n</option>
				
}
function kto_obrab_view ($obrab, $rul)
{	
    if ($rul==3)
	{
		switch ($obrab)
		{
			case 0:
				$sel0='selected';			
				break;
			case 1:
				$sel1='selected';
				break;
			case 2:
				$sel2='selected';			
				break;
		}
		echo "
		<select name='zay_kto_obrabat'>\n
		<option value='0' $sel0>Никто не обрабатывает\n
		<option value='1' $sel1>Обрабатывает Артем\n
		<option value='2' $sel2>Обрабатывает Слава\n			
		</select>";
	}
	elseif ($rul==2)
	{
		switch ($obrab)
		{
			case 0:
				$sel='Никто не обрабатывает';			
				break;
			case 1:
				$sel='Обрабатывает Артем';
				break;
			case 2:
				$sel='Обрабатывает Слава';			
				break;
		}
		echo "$sel";	
	}
}
function zay_status_commerc ($status, $rul)
{	
    if ($rul==3)
	{
		switch ($status)
		{
			case 0:
				$sel0='selected';			
				break;
			case 1:
				$sel1='selected';
				break;
			case 2:
				$sel2='selected';			
				break;
		}
		echo "
		<select name='zay_status_commerc'>\n
		<option value='0' $sel0>Нет коммерческого предложения\n</option>
		<option value='1' $sel1>Есть коммерческое предложение\n</option>
		<option value='2' $sel2>Предварительное коммерческое предложение\n</option>			
		</select>";
	}
	elseif ($rul==1)
	{
		switch ($status)
		{
			case 0:
				$sel='Нет коммерческого предложения';			
				break;
			case 1:
				$sel='Есть коммерческое предложение';
				break;
			case 2:
				$sel='Предварительное коммерческое предложение';			
				break;
		}
		echo "$sel";	
	}
}


function obrabotchik_check ($id_otrab, $id)
{	
	if ($id=='') $sel0='selected';
	if ($id!='') $sel1='selected';			
	echo "<select name='obrabotchik_check[]'>\n
	  <option value='0' $sel0>Не выбран\n</option>
	  <option value='".$id_otrab."' $sel1>Выбран\n</option>			
	 </select> ";
}
function instrukt_type ($id)
{	
	if ($id=='0') $sel0='selected';
	if ($id=='1') $sel1='selected';			
	echo "<select name='instrukt_type[]'>\n
	  <option value='0' $sel0>Индивидуальная\n</option>
	  <option value='1' $sel1>Общая\n</option>
	 </select>";
}
function otrabotka_status ($status)
{	
	switch ($status)
	{
		case 0:
			$sel0='selected';			
			break;
		case 1:
			$sel1='selected';
			break;
		case 2:
			$sel2='selected';			
			break;
		case 3:
			$sel3='selected';
			break;
		case 4:
			$sel4='selected';			
			break;
		case 5:
			$sel5='selected';			
			break;
	}		
	echo "<select name='otrabotka_status[]'>\n
	  <option value='0' $sel0>Не принято в отработку\n</option>
	  <option value='1' $sel1>Принято в отрабоку, отложено на потом\n</option>
	  <option value='2' $sel2>Принято, отрабатывается сейчас\n</option>
	  <option value='3' $sel3>Принято, есть промежуточные результаты\n</option>
	  <option value='4' $sel4>Принято, пром. результаты, пауза в отработке\n</option>
	  <option value='5' $sel5>Заявка отработана\n</option>
	</select>";
}					   
function ekr_sql($value)
{
  if (is_array($value)==true) 
    for($i=0;$i<count($value);$i++)
      $rez[$i]=addslashes($value[$i]);
  else $rez=addslashes($value);
  
  return $rez;
}
?>