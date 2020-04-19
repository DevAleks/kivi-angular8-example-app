<?php
function status2 ($status, $last_kont)
{	
    //ответственность по "календарю"
        //echo $zay_view[16]."<br>";//Проверка!
        $data_m=explode('-', $last_kont);
        $d1=$data_m[2];
        $m1=$data_m[1];
        $y1=$data_m[0];		  
        if ($d1>0 && $m1>0 && $y1>0)
        {
          $timestamp1=mktime(0, 0, 0, $m1, $d1, $y1);
          $timestamp2=mktime(0, 0, 0, date("m"), date("d"), date("y"));
          //echo '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d = '.date("d").' m = '.date("m").' y = '.date("y").'<br>';//Проверка!
          //echo "timestamp1 = ".$timestamp1." | timestamp2 = ".$timestamp2."<br>";//Проверка!
          if ($timestamp1<=$timestamp2)
          {
            $c_man='red';
            $c_kl='';	
          }
          elseif ($timestamp1>$timestamp2)
          {
            $c_man='';
            $c_kl='yellow';	
          }
        }




    //ответственность по статусам
		switch ($status)
		{
			case 1:
				$znachenie='<span class="'.$c_kl.'">&nbsp; К &nbsp;</span><span class="'.$c_man.'">&nbsp; М &nbsp;</span>&nbsp; А &nbsp;<span class="green">&nbsp; З &nbsp;</span><br>Админ: новая заявка обработана';
				break;
			case 2:
				$znachenie='<span class="'.$c_kl.'">&nbsp; К &nbsp;</span><span class="'.$c_man.'">&nbsp; М &nbsp;</span>&nbsp; А &nbsp;<span class="green">&nbsp; З &nbsp;</span><br>Закупщик: заявка в поиске';			
				break;
			case 3:
				$znachenie='<span class="'.$c_kl.'">&nbsp; К &nbsp;</span><span class="red">&nbsp; М &nbsp;</span>&nbsp; А &nbsp;&nbsp; З &nbsp;<br>Админ: промежуточные результаты, клиенту не озвучено';
				break;
			case 4:
				$znachenie='<span class="'.$c_kl.'">&nbsp; К &nbsp;</span><span class="'.$c_man.'">&nbsp; М &nbsp;</span>&nbsp; А &nbsp;<span class="green">&nbsp; З &nbsp;</span><br>Менеджер: клиенту озвучен промежуточный ответ';			
				break;
			case 5:
				$znachenie='<span class="'.$c_kl.'">&nbsp; К &nbsp;</span><span class="red">&nbsp; М &nbsp;</span>&nbsp; А &nbsp;&nbsp; З &nbsp;<br>Админ: промежуточные результаты, клиенту не озвучено';
				break;
			case 6:
				$znachenie='<span class="'.$c_kl.'">&nbsp; К &nbsp;</span><span class="'.$c_man.'">&nbsp; М &nbsp;</span><span class="blue">&nbsp; А &nbsp;</span>&nbsp; З &nbsp;<br>Закупщик: окончательные результаты';			
				break;
			case 7:
				$znachenie='<span class="yellow">&nbsp; К &nbsp;</span><span class="'.$c_man.'">&nbsp; М &nbsp;</span>&nbsp; А &nbsp;&nbsp; З &nbsp;<br>Менеджер: клиенту озвучен окончательные ответ';
				break;
			case 8:
				$znachenie='<span class="yellow">&nbsp; К &nbsp;</span><span class="'.$c_man.'">&nbsp; М &nbsp;</span>&nbsp; А &nbsp;&nbsp; З &nbsp;<br>Менеджер: ожидание ответа клиента';			
				break;
			case 9:
				$znachenie='<span class="yellow">&nbsp; К &nbsp;</span><span class="'.$c_man.'">&nbsp; М &nbsp;</span>&nbsp; А &nbsp;&nbsp; З &nbsp;<br>Менеджер: выставлен счет';
				break;					
			case 10:
				$znachenie='<span class="'.$c_kl.'">&nbsp; К &nbsp;</span><span class="'.$c_man.'">&nbsp; М &nbsp;</span><span class="blue">&nbsp; А &nbsp;</span>&nbsp; З &nbsp;<br>Менеджер: счет оплачен, ждем деньги';			
				break;
			case 11:
				$znachenie='<span class="'.$c_kl.'">&nbsp; К &nbsp;</span><span class="'.$c_man.'">&nbsp; М &nbsp;</span>&nbsp; А &nbsp;<span class="green">&nbsp; З &nbsp;</span><br>Админ: деньги поступили, закупаем товар';
				break;
			case 12:
				$znachenie='<span class="'.$c_kl.'">&nbsp; К &nbsp;</span><span class="'.$c_man.'">&nbsp; М &nbsp;</span><span class="blue">&nbsp; А &nbsp;</span>&nbsp; З &nbsp;<br>Админ: товар поставляется на склад';			
				break;
			case 13:
				$znachenie='<span class="yellow">&nbsp; К &nbsp;</span><span class="'.$c_man.'">&nbsp; М &nbsp;</span>&nbsp; А &nbsp;&nbsp; З &nbsp;<br>Админ: отгрузка товара';
				break;
			case 14:
				$znachenie='<span class="'.$c_kl.'">&nbsp; К &nbsp;</span><span class="'.$c_man.'">&nbsp; М &nbsp;</span><span class="blue">&nbsp; А &nbsp;</span>&nbsp; З &nbsp;<br>Менеджер: рекламации';			
				break;
			case 15:
				$znachenie='<span class="'.$c_kl.'">&nbsp; К &nbsp;</span><span class="'.$c_man.'">&nbsp; М &nbsp;</span>&nbsp; А &nbsp;&nbsp; З &nbsp;<br>Админ: сделка закрыта';
				break;	
			case 16:
				$znachenie='<span class="'.$c_kl.'">&nbsp; К &nbsp;</span><span class="'.$c_man.'">&nbsp; М &nbsp;</span>&nbsp; А &nbsp;&nbsp; З &nbsp;<br>Менеджер: отказ клиента';
				break;
			case 17:
				$znachenie='<span class="'.$c_kl.'">&nbsp; К &nbsp;</span><span class="'.$c_man.'">&nbsp; М &nbsp;</span>&nbsp; А &nbsp;&nbsp; З &nbsp;<br>Менеджер: не ответили клиенту, просроченная заявка';			
				break;
			case 18:
				$znachenie='<span class="'.$c_kl.'">&nbsp; К &nbsp;</span><span class="'.$c_man.'">&nbsp; М &nbsp;</span><span class="blue">&nbsp; А &nbsp;</span>&nbsp; З &nbsp;<br>Менеджер: изменения в заявке';
				break;	
			case 19:
				$znachenie='<span class="'.$c_kl.'">&nbsp; К &nbsp;</span><span class="'.$c_man.'">&nbsp; М &nbsp;</span>&nbsp; А &nbsp;<span class="green">&nbsp; З &nbsp;</span><br>Закупщик: инструкция прочитана';
				break;
			case 20:
				$znachenie='<span class="'.$c_kl.'">&nbsp; К &nbsp;</span><span class="'.$c_man.'">&nbsp; М &nbsp;</span><span class="blue">&nbsp; А &nbsp;</span>&nbsp; З &nbsp;<br>Закупщик: промежуточные результаты';
				break;
			case 21:
				$znachenie='<span class="'.$c_kl.'">&nbsp; К &nbsp;</span><span class="'.$c_man.'">&nbsp; М &nbsp;</span><span class="blue">&nbsp; А &nbsp;</span>&nbsp; З &nbsp;<br>Закупщик: необходима доп. информация от клиента';
				break;
			case 22:
				$znachenie='<span class="'.$c_kl.'">&nbsp; К &nbsp;</span><span class="red">&nbsp; М &nbsp;</span>&nbsp; А &nbsp;&nbsp; З &nbsp;<br>Админ: необходима доп. информация от клиента';
				break;
			case 23:
				$znachenie='<span class="'.$c_kl.'">&nbsp; К &nbsp;</span><span class="red">&nbsp; М &nbsp;</span>&nbsp; А &nbsp;&nbsp; З &nbsp;<br>Админ: окончательные результаты, клиенту не озвучено';
				break;
			default:
				$znachenie='<span class="'.$c_kl.'">&nbsp; К &nbsp;</span><span class="'.$c_man.'">&nbsp; М &nbsp;</span><span class="blue">&nbsp; А &nbsp;</span>&nbsp; З &nbsp;<br>Добавлена новая заявка';			
				break;
		}	
		return($znachenie);
}

function status1 ($status)
{	
		switch ($status)
		{
			case 1:
				$znachenie='Обработана';
				break;
			case 2:
				$znachenie='В поиске';			
				break;
			case 3:
				$znachenie='Промежуточный ответ, клиенту не озвучен';
				break;
			case 4:
				$znachenie='Промежуточный ответ клиенту озвучен';			
				break;
			case 5:
				$znachenie='Промежуточный ответ частично не озвучен';
				break;
			case 6:
				$znachenie='Поиск окончен';			
				break;
			case 7:
				$znachenie='Дан ответ клиенту';
				break;
			case 8:
				$znachenie='Ожидание ответа клиента';			
				break;
			case 9:
				$znachenie='Выставлен счет';
				break;					
			case 10:
				$znachenie='Ожидание платежа';			
				break;
			case 11:
				$znachenie='Закупка товара';
				break;
			case 12:
				$znachenie='Поставка на склад';			
				break;
			case 13:
				$znachenie='Отгрузка товара';
				break;
			case 14:
				$znachenie='Рекламации';			
				break;
			case 15:
				$znachenie='Сделка закрыта';
				break;	
			case 16:
				$znachenie='Отказ клиента';
				break;
			case 17:
				$znachenie='Не ответили клиенту (просрочена)';			
				break;
			case 18:
				$znachenie='Заявка дополнена/изменена';
				break;	
			default:
				$znachenie='Новая';			
				break;
		}	
		return($znachenie);
}
function prioritet ($prioritet)
{	
		switch ($prioritet)
		{
			case 0:
				$znachenie='Самый высокий';			
				break;
			case 1:
				$znachenie='Высокий';
				break;
			case 2:
				$znachenie='Средний';			
				break;
			case 3:
				$znachenie='Низкий';
				break;
			case 4:
				$znachenie='Самый низкий';			
				break;
		}	
		return($znachenie);
}
function prioritet_hidden ($prioritet)
{	
		switch ($prioritet)
		{
			case 0:
				$znachenie='Snabzenec';			
				break;
			case 1:
				$znachenie='GruzSnab';			
				break;
			case 2:
				$znachenie='Скрыть заявку';
				break;
			case 3:
				$znachenie='WorldSnab';
				break;
		}	
		return($znachenie);
}
function firma_obr ($firma_obr)
{	
		switch ($firma_obr)
		{
			case 0:
				$znachenie='<span class="blue">LiderGruz</span>';			
				break;
			case 1:
				$znachenie='<span class="yellow">Zavod-Leader</span>';			
				break;
			case 2:
				$znachenie='<span class="green">SuperSkoba</span>';
				break;
			case 3:
				$znachenie='<span class="red">MGSnab</span>';
				break;
			case 4:
				$znachenie='Снабженец';
				break;
			case 5:
				$znachenie='<span class="orange">Worldsnab</span>';
				break;
			case 6:
				$znachenie='Иное';
				break;
		}	
		return($znachenie);
}

function status_commerc ($commerc)
{	
		switch ($commerc)
		{
			case 0:
				$znachenie='Нет';			
				break;
			case 1:
				$znachenie='Есть';
				break;
			case 2:
				$znachenie='Предв.';			
				break;
		}	
		return($znachenie);
}
function status_obrab ($obr)
{	
		switch ($obr)
		{
			case 1:
				$znachenie='Артем';			
				break;
			case 2:
				$znachenie='Слава';
				break;
			default:
				$znachenie='Никто не обр.';			
				break;
		}	
		return($znachenie);
}
function status_instrukt($inst)
{	
		switch ($inst)
		{
			case 1:
				$znachenie='Есть';			
				break;
			default:
				$znachenie='Нет';			
				break;
		}	
		return($znachenie);
}
function status_otrabotka ($otrabotka)
{	
		switch ($otrabotka)
		{
			case 0:
				$znachenie='Не принято в отработку';			
				break;
			case 1:
				$znachenie='Принято в отрабоку, отложено на потом';
				break;
			case 2:
				$znachenie='Принято, отрабатывается сейчас';			
				break;
			case 3:
				$znachenie='Принято, есть промежуточные результаты';
				break;
			case 4:
				$znachenie='Принято, пром. результаты, пауза в отработке';			
				break;
			case 5:
				$znachenie='Заявка отработана';			
				break;
		}	
		return($znachenie);
}
?>