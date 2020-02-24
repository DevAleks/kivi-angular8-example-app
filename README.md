<p align="center">
  <a href="https://angular.io/">
    <img src="https://www.angularexampleapp.com/assets/images/angular.svg" alt="Logo" width=72 height=72>
  </a>
  <h1 align="center">Kivi-App, учебное приложение на Angular 8.3.23 и Typescript</h1>
</p>

## Технологии  
Приложение выполнено на Angular 8.3.23 и Typescript, серверная часть на PHP и MySQL, Unit тестирование Jasmine + Karma, E2E тестирование Jasmine + Protractor, виртуализация на Docker и Docker-Compose.  

### Элементы Angular  
- [x] Компоненты [frontend/src/app/components/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/components/)
- [x] Сервисы [frontend/src/app/services/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/services/)
- [x] Pipe [frontend/src/app/pipes/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/pipes/)
- [x] Роутер [frontend/src/app/app.module.ts](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/app.module.ts) (строка 41)
- [x] Формы, содержат валидатор с обработкой ошибок, выполняют отправку данных и получение ответа от сервера:
    * [frontend/src/app/components/callorder-form/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/components/callorder-form/)
    * [frontend/src/app/components/first-form/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/components/first-form/)
    * [frontend/src/app/components/footer-form/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/components/footer-form/)
    * [frontend/src/app/components/question-form/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/components/question-form/)
    * [frontend/src/app/components/top-form/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/components/top-form/)
- [x] Получение данных из Json файла [frontend/src/app/components/first-block/first-block.component.ts](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/components/first-block/first-block.component.ts) (строка 25)
- [x] Ленивая загрузка изображений с [ng-lazyload-image](https://github.com/tjoskar/ng-lazyload-image)
- [x] Вывод тегов <script ...> в шаблонах. Обеспечивающий компонент[frontend/src/app/components/scripthack](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/components/scripthack) и пример вывода в шаблоне [frontend/src/app/components/subscribe-block/subscribe-block.component.html](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/components/subscribe-block/subscribe-block.component.html)
- [x] Unit тестирование Jasmine + Karma
- [x] End-to-end тестирование Jasmine + Protractor
  
### Серверная часть   
Обработка данных из форм производится PHP скриптом.   
При корректном выполнении сценария данные из форм записываются в БД на MySQL. Также PHP скрипт модифицирует полученные данные перед отправкой их обратно в приложение, что служит маркером успешного получения этих данных.  
При ошибке записи данных в БД сервер отправляет в приложение сообщение об ошибке.  
Путь к скрипту обработки форм: [backend/requests.add.php](https://github.com/DevAleks/Kivi/tree/master/backend/requests.add.php)  
  
### Виртуализация 
- [x] Выполнена на Docker и Docker-Compose
- [x] 3 комплекта конфигов на Docker-Compose, используемых для:  
    * разработки приложения [docker-compose.yaml](https://github.com/DevAleks/Kivi/tree/master/docker-compose.yaml)  
    * Unit тестирования [dc-angular-unit-tests.yaml](https://github.com/DevAleks/Kivi/tree/master/dc-angular-unit-tests.yaml)  
    * E2E тестирования [dc-angular-e2e-tests.yaml](https://github.com/DevAleks/Kivi/tree/master/dc-angular-e2e-tests.yaml)  
  
<br />  

## Приложение  

Приложение Kivi-App представляет собой "набросок" будущего сайта и содержит 4 страницы:
* /  
* /rafting  
* /semeyniy-rafting  
* страница ошибки 404  
  
На всех страницах отличаются только верхние блоки с контентом.  
Приложение сделано на основе сторонней верстки на Bootstrap 4.  
  
<br /> 
  
## Инсталяция и запуск
Для работы с приложением рекомендуется использовать Docker, под него сделаны все необходимые настройки для совместной работы frontend и backend. Инсталяция и запуск описаны с использованием Docker. 
1. Склонировать приложение.  
  
2. Установить зависимости:  
 ```bash
 docker run --rm -v ${PWD}/frontend/:/opt/kivi -w /opt/kivi node:12 npm install
 ```
3. Первый запуск и build образа:  
 ```bash
 docker-compose up --build -d
 ```
  Последующие запуски:  
 ```bash
 docker-compose up -d
 ```
4. Создание рабочей БД kiviapp через Phpmyadmin http://localhost:8081/ (root / root). Создание структуры БД kiviapp через php: http://localhost:80/create.new.table.php или через Phpmyadmin (запрос с таблицей лежит в backend/create.new.table.php)  

### Работа с frontend
1. Вход через http://localhost:4200/  
2. Заполнить и отправить любую форму обратной связи. Если данные из корректно заполненной формы успешно попали на сервер, то появится сообщение об успешной отправке запроса.  
  
### Остановка приложения и очистка контейнеров Docker
 ```bash
 docker-compose kill
 docker-compose down 
 ```  
  
<br /> 
  
## Функционал

### Формы обратной связи
На каждой станице есть 5 различных форм обратной связи, позволяющих посетителям отправлять заказы услуг. 4 формы в модальных окнах доступны по кнопкам:  
1. Заказать звонок (шапка)  
2. Задать вопрос (шапка)  
3. Заказать (шапка)  
4. Заказать сейчас (контент)

Пятая форма расположена внизу страницы.  
Каждая форма умеет проверять введенные данные и подсказывать какие ошибки ввода нужно исправить, если они есть. Если все данные введены корректно, то форма пытается отправить их на сервер и ждет его ответ. После получения ответа сервера он выводится на экран. Как пример обработки ошибок могут быть 3 варианта ответа:
* Отправка данных прошла успешно
* Отправить данные не удалось
* Сервер неверно обработал полученные данные

### Интеграции со сторонним кодом
В верстке страниц присутствуют:
* Вставка видео с Youtube
* "Карусель" Fancybox
* Виджет VK
  
<br />   
  
## Unit тестирование
Тестами покрыто примерно 80% всех функций. Код тестов содержится рядом с кодом приложения: [frontend/src/app/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/)

### Работа с Unit тестами (через Docker и Docker-Compose)
1. Запуск: 
 ```bash
 docker-compose -f dc-angular-unit-tests.yaml up -d 
 ```  
Далее открыть вкладку браузера: http://localhost:9876/    
2. Остановка и очистка контейнеров Docker: 
 ```bash
 docker-compose -f dc-angular-unit-tests.yaml kill
 docker-compose -f dc-angular-unit-tests.yaml down 
 ```  

<br />   
  
## E2E тестирование
Разбито на 2 части. Покрыты только некоторые элементы страницы и проверены 3 коротких use case для форм обратной связи.
Код тестов расположен тут: [frontend/e2e/src/](https://github.com/DevAleks/Kivi/tree/master/frontend/e2e/src/)

### Первая часть, элементы страницы
Тестами покрыта генерация различных типов элементов:
* Обычные элементы из шаблонов компонентов
* Элементы, подгружаемые из JSON файла при загрузке приложения
* Проверка корректность работы "карусели" и перехода по ссылке на другую страницу.

Путь: [frontend/e2e/src/app-kivi-default.e2e-spec.ts](https://github.com/DevAleks/Kivi/tree/master/frontend/e2e/src/app-kivi-default.e2e-spec.ts)

### Вторая часть, формы обратной связи
Выполняется проверка 3 сценариев:
1. Открытие/закрытие модального окна одной из форм
2. Обработка 2-х ошибок корректности заполнения формы
3. Отправка валидных данных на работающий и неработающий backend. Т.е. при работающем или неработающем backend один из тестов будет не пройден.

Путь: [frontend/e2e/src/app-kivi-test-form.e2e-spec.ts](https://github.com/DevAleks/Kivi/tree/master/frontend/e2e/src/app-kivi-test-form.e2e-spec.ts)

### Работа с E2E тестами (через Docker и Docker-Compose)
1. Первый запуск с созданием образа: 
 ```bash
 docker-compose -f dc-angular-e2e-tests.yaml up --build -d
 ``` 
  Последующие запуски:
 ```bash
 docker-compose -f dc-angular-e2e-tests.yaml up -d
 ```  
2. Результаты тестов запишутся в файл frontend/logs.txt  
3. Остановка и очистка контейнеров Docker: 
 ```bash
 docker-compose -f dc-angular-e2e-tests.yaml kill
 docker-compose -f dc-angular-e2e-tests.yaml down
 ``` 

Внимание! Используемый для Е2Е тестов Docker образ trion/ng-cli-e2e работает некорректно с тестами, связанными с передачей запросов на backend. Это тесты:  
* Use case 3 (send valid data to working server): should have success message  
* Use case 3 (send valid data to broken server): should have error server data sending message

Решает проблему запуск Е2Е тестов локально: 
 ```bash
 ng e2e
 ``` 
При этом можно воспользоваться запущенными в Docker контейнерами с PHP и MySQL.
