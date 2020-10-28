<p align="center">
  <a href="https://angular.io/">
    <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="Logo" width="72" height="72">
  </a>
  <h1 align="center">Kivi-App, учебное приложение на Angular 8.3.23 и Typescript</h1>
</p>
  
## Технологии  
- [x] Frontend: Angular 8.3.23 и Typescript
- [x] Backend: PHP и MySQL
- [x] Unit тестирование: Jasmine + Karma
- [x] E2E тестирование: Jasmine + Protractor
- [x] Виртуализация: Docker и Docker-Compose
  
<br /> 
   
## Приложение  
Приложение Kivi-App представляет собой "набросок" будущего сайта с панелью администрирования и бекендом с использованием принципов REST API.  
- [x] Пользовательская часть сайта имеет 4 страницы:  
 * /  
 * /rafting  
 * /semeyniy-rafting  
 * /error404 (страница ошибки 404)      
На всех страницах отличаются только верхние блоки с контентом.    
     
- [x] Панель администрирования имеет систему авторизации через JWT и 4 страницы:  
 * /admin/login (страница входа)
 * /admin/dashboard (страница со списком заказов с ссылками на изменение и удаление заказов)
 * /admin/create-order (страница создания нового заказа)
 * /admin/order/%ID заказа%/edit (страница изменения заказа)
  
<br /> 
   
### Frontend, элементы Angular  
- [x] Компоненты  
 * Пользовательская часть: [frontend/src/app/shared/components/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/shared/components/)
 * Админка: [frontend/src/app/admin/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/admin/)
- [x] Сервисы   
 * Пользовательская часть: [frontend/src/app/shared/services/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/shared/services/)
 * Админка: [frontend/src/app/admin/shared/services/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/admin/shared/services/)
- [x] Pipe [frontend/src/app/shared/pipes/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/shared/pipes/)
- [x] Получение данных из Json файла [frontend/src/app/shared/components/first-block/first-block.component.ts](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/shared/components/first-block/first-block.component.ts) (строка 58)
- [x] Роутеры:  
 * Пользовательской части [frontend/src/app/app-routing.module.ts](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/app-routing.module.ts)
 * Админки с защитой роутов [frontend/src/app/admin/admin.module.ts](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/admin/admin.module.ts)
- [x] Формы обратной связи, содержат валидатор с обработкой ошибок, выполняют отправку данных, получают и обрабатывают ответ от сервера:
 * Форма заказа 1 [frontend/src/app/shared/components/callorder-form/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/shared/components/callorder-form/)
 * Форма заказа 2 [frontend/src/app/shared/components/first-form/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/shared/components/first-form/)
 * Форма заказа 3 [frontend/src/app/shared/components/footer-form/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/shared/components/footer-form/)
 * Форма заказа 4 [frontend/src/app/shared/components/question-form/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/shared/components/question-form/)
 * Форма заказа 5 [frontend/src/app/shared/components/top-form/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/shared/components/top-form/)
 * Форма входа в админку: [frontend/src/app/admin/login-page/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/admin/login-page/)  
 * Форма создания заказа в админке: [frontend/src/app/admin/create-order/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/admin/create-order/) 
 * Кастомные валидаторы для форм: [frontend/src/app/shared/form.validators.ts](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/shared/form.validators.ts)
- [x] Модули, 4 для пользовательских страниц приложения, 1 для админки и 2 для более удобной и оптимизированной группировки прочих сущностей Angular:
 * Главная страница: [frontend/src/app/main/main.module.ts](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/main/main.module.ts)
 * Страница /rafting: [frontend/src/app/rafting/rafting.module.ts](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/rafting/rafting.module.ts)
 * Страница /semeyniy-rafting: [frontend/src/app/semeyniy-rafting/semeyniy-rafting.module.ts](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/semeyniy-rafting/semeyniy-rafting.module.ts)
 * Страница ошибки 404: [frontend/src/app/error404/error404.module.ts](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/error404/error404.module.ts)
 * Модуль для основных сущностей: [frontend/src/app/shared/shared.module.ts](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/shared/shared.module.ts)
 * Модуль для доп. сущностей на 3-х основных страницах: [frontend/src/app/shared/pages.module.ts](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/shared/pages.module.ts)
 * Модуль для панели администрирования: [frontend/src/app/admin/admin.module.ts](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/admin/admin.module.ts)
- [x] Механизм авторизации через JWT токены для админки: 
 * Получение токена, его хранение в Local Storage и удаление токена
 * Проверка валидности токена
 * Обработка ошибок
- [x] Интерсептор для проверки валидности текущего токена в админке: [frontend/src/app/shared/auth.interceptor.ts](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/shared/auth.interceptor.ts) 
- [x] Ленивая загрузка изображений в пользовательской части с [ng-lazyload-image](https://github.com/tjoskar/ng-lazyload-image)
- [x] WYSIWYG редактор [ngx-quill](https://www.npmjs.com/package/ngx-quill) для формы создания новых заказов в админке
- [x] Пагинация на странице списка заказов [frontend/src/app/admin/dashboard-page/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/admin/dashboard-page/) с помощью [jw-angular-pagination](https://github.com/cornflourblue/jw-angular-pagination)
- [x] Ru локализация в date pipe на странице списка заказов [frontend/src/app/admin/dashboard-page/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/admin/dashboard-page/)
- [x] Поддержка PWA. Если собрать приложение в режиме prodact, то оно будет работать как PWA, с использованием встроенного Service Worker
- [x] Вывод тегов <script ...> в шаблонах. Обеспечивающий компонент [frontend/src/app/shared/components/scripthack](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/shared/components/scripthack) и пример вывода тега в шаблоне [frontend/src/app/components/subscribe-block/subscribe-block.component.html](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/components/subscribe-block/subscribe-block.component.html)
- [x] Вывод видео с Youtube, url видео загружается из JSON файла [frontend/src/app/shared/components/video-block/](https://github.com/DevAleks/kivi-angular8-example-app/tree/master/frontend/src/app/shared/components/video-block/)
    
### Тестирование 
- [x] Unit тестирование пользовательской части приложения Jasmine + Karma
- [x] End-to-end тестирование пользовательской части приложения Jasmine + Protractor
    
### Backend 
- [x] Бекенд работает на PHP и MySQL.    
 * В пользовательской части сайта обработка данных из форм заказа производится PHP скриптом: [backend/requests.add.php](https://github.com/DevAleks/Kivi/tree/master/backend/requests.add.php). При корректном выполнении сценария данные из форм записываются в БД на MySQL. Также PHP скрипт модифицирует полученные данные перед отправкой их обратно на frontend, что служит маркером успешного получения и обработки этих данных бекендом. При ошибке записи данных в БД сервер также отправляет на frontend сообщение о возникшей проблеме.    
 * Панель администрирования обменивается данными с бекендом через 4 endpoints:  
  * Страница входа в админку (/admin/login), endpoint: [backend/jwt/api/login.php](https://github.com/DevAleks/Kivi/tree/master/backend/jwt/api/login.php)  
  * Страница списка заказов (/admin/dashboard), endpoint: [backend/jwt/api/get_orders.php](https://github.com/DevAleks/Kivi/tree/master/backend/jwt/api/get_orders.php) 
  * Страница создания нового заказа (/admin/create-order), endpoint: [backend/jwt/api/create_order.php](https://github.com/DevAleks/Kivi/tree/master/backend/jwt/api/create_order.php)  
  * Страница редактирования заказа (admin/order/%id заказа%/edit), endpoint: [backend/jwt/api/update_order.php](https://github.com/DevAleks/Kivi/tree/master/backend/jwt/api/update_order.php)    
А также функция удаления заказа через [backend/jwt/api/delete_order.php](https://github.com/DevAleks/Kivi/tree/master/backend/jwt/api/delete_order.php)  
- [x] Аутентификация c токенами через [библиотеку JWT](https://github.com/firebase/php-jwt) 
  
### Виртуализация 
- [x] Выполнена на Docker и Docker-Compose
- [x] 2 Dockerfile для:
 * frontend [frontend/Dockerfile](https://github.com/DevAleks/Kivi/tree/master/frontend/Dockerfile)
 * backend [backend/Dockerfile](https://github.com/DevAleks/Kivi/tree/master/backend/Dockerfile)
- [x] 3 конфига Docker-Compose, используемых для:  
 * разработки приложения [docker-compose.yaml](https://github.com/DevAleks/Kivi/tree/master/docker-compose.yaml)  
 * Unit тестирования [dc-angular-unit-tests.yaml](https://github.com/DevAleks/Kivi/tree/master/dc-angular-unit-tests.yaml)  
 * E2E тестирования [dc-angular-e2e-tests.yaml](https://github.com/DevAleks/Kivi/tree/master/dc-angular-e2e-tests.yaml)  
  
<br />  

## Инсталяция и запуск
Для работы с приложением рекомендуется использовать Docker, под него сделаны все необходимые настройки для совместной работы frontend и backend. Инсталяция и запуск приложения описаны для Docker. 
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
4. Создание рабочей БД kiviapp для приложения.
Создание структуры БД kiviapp и пользователя админки admin@kiviapp.com / 11111111 возможно 2-мя способами:
* Запустив скрипт: http://localhost:80/create.new.table.php 
* Через PhpMyAdmin, http://localhost:8081/ (root / root), запросы с таблицами лежат в файле [backend/create.new.table.php](https://github.com/DevAleks/Kivi/tree/master/backend/create.new.table.php))  
  
### Остановка приложения и очистка контейнеров Docker
 ```bash
 docker-compose kill
 docker-compose down 
 ```  
  
<br /> 
  
## Функционал приложения
  
### Демонстрация возможностей приложения  
1. Вход в пользовательску часть: http://localhost:4200/. Здесь можно заполнить и отправить любую форму обратной связи. Если данные из корректно заполненной формы успешно попали на сервер, то появится сообщение об успешной отправке запроса.  
2. Вход в панель администрирования: http://localhost:4200/admin/login (admin@kiviapp.com / 11111111). Здесь можно создать новый заказ на странице "Новый заказ" http://localhost:4200/admin/create-order.  
  
### Формы обратной связи в пользовательской части
На каждой станице есть 5 различных форм обратной связи, позволяющих посетителям отправлять заказы услуг. 4 формы в модальных окнах доступны по кнопкам:  
 * Заказать звонок (шапка)  
 * Задать вопрос (шапка)  
 * Заказать (шапка)  
 * Заказать сейчас (контент)  
Пятая форма расположена внизу страницы.  
  
Каждая форма умеет проверять введенные данные и подсказывать какие ошибки ввода нужно исправить, если они есть. Если все данные введены корректно, то форма пытается отправить их на сервер и ждет его ответ. После получения ответа сервера он выводится на экран. Как пример обработки ошибок могут быть 3 варианта ответа:  
* Отправка данных прошла успешно  
* Отправить данные не удалось  
* Сервер неверно обработал полученные данные  
  
<br />   
  
## Unit тестирование  
Тестами покрыто примерно 80% всех функций. Код тестов содержится рядом с кодом приложения: [frontend/src/app/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/)  
  
### Работа с Unit тестами (через Docker и Docker-Compose)  
1. Запуск:  
 ```bash
 docker-compose -f dc-angular-unit-tests.yaml up -d 
 ```  
Далее открыть вкладку браузера: http://localhost:9876/, ждем 10-15 секунд и перегружаем ее (в некоторых случаях 2-3 раза). Если все сработало, то во вкладке должна отобразиться информация о ходе тесирования.    
Для повторного запуска тестов нужно перезагрузить эту же вкладку браузера.    
  
2. Остановка и очистка контейнеров Docker после завершения Unit тестирования:  
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
  
