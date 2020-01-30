# Kivi-App, учебное приложение на Angular 8.3.23 и Typescript
**Unit-testing Jasmine + Karma / E2E-testing Jasmine + Protractor / серверная часть на PHP и MySQL / виртуализация на Docker и Docker-Compose**

Приложение Kivi-App представляет собой "набросок" будущего сайта и содержит 4 страницы сайта:
* /
* /rafting
* /semeyniy-rafting
* страница ошибки 404   
На всех страницах отличаются только верхние блоки с контентом.  
Приложение сделано на основе сторонней верстки на Bootstrap 4.  
  
<br /> 
  
## Build и запуск приложения (с Docker и Docker-Compose)
1. Первый build и запуск: docker-compose up --build -d  
Последующие запуски: docker-compose up -d  
2. Создание рабочей БД kiviapp через Phpmyadmin http://localhost:8081/ (root / root). Создание структуры БД kiviapp через php: http://localhost:80/create.new.table.php или через Phpmyadmin (запрос с таблицей лежит в backend/create.new.table.php)

### Работа с frontend
1. Вход через http://localhost:4200/
2. Заполнить и отправить любую форму обратной связи. Если все ок, то появится сообщение об успешной отправке запроса.
  
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
  
## Технологии
Приложение выполнено на Angular 8.3.23 и Typescript, серверная часть на PHP и MySQL, unit тестирование Jasmine + Karma, E2E тестирование Jasmine + Protractor, виртуализация на Docker и Docker-Compose.

### Элементы Angular
* Компоненты [frontend/src/app/components/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/components/)
* Сервисы [frontend/src/app/services/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/services/)
* Pipe [frontend/src/app/pipes/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/pipes/)
* Роутер [frontend/src/app/app.module.ts](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/app.module.ts) (строка 41)
* Формы - валидатор с обработкой ошибок, отправка данных и получение ответа от сервера:
* - [frontend/src/app/components/callorder-form/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/components/callorder-form/)
* - [frontend/src/app/components/first-form/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/components/first-form/)
* - [frontend/src/app/components/footer-form/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/components/footer-form/)
* - [frontend/src/app/components/question-form/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/components/question-form/)
* - [frontend/src/app/components/top-form/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/components/top-form/)
* Получение данных из Json файла [frontend/src/app/components/first-block/first-block.component.ts](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/components/first-block/first-block.component.ts) (строка 25)
* Вывод тегов <script ...> в шаблонах. Обеспечивающий компонент[frontend/src/app/components/scripthack](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/components/scripthack) и пример вывода в шаблоне [frontend/src/app/components/subscribe-block/subscribe-block.component.html](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/components/subscribe-block/subscribe-block.component.html)
  
### Серверная часть 
Обработка данных из форм производится PHP скриптом.   
При корректном выполнении сценария данные из форм записываются в БД на MySQL. Также скрипт модифицирует полученные данные, что служит маркером их успешного получения и отправляет их обратно в приложение.  
При ошибке записи данных в БД сервер отправляет в приложение сообщение об ошибке.  
Путь к скрипту обработки форм: [backend/requests.add.php](https://github.com/DevAleks/Kivi/tree/master/backend/requests.add.php)
  
<br />   
  
## Unit тестирование
Тестами покрыто примерно 80% всех функций. Код тестов содержится рядом с кодом приложения: [frontend/src/app/](https://github.com/DevAleks/Kivi/tree/master/frontend/src/app/)

### Работа с Unit тестами (через Docker и Docker-Compose)
1. Запуск: docker-compose -f dc-angular-unit-tests.yaml up -d  
Далее открыть вкладку браузера: http://localhost:9876/
2. Остановка: docker-compose -f dc-angular-unit-tests.yaml kill;docker-compose -f dc-angular-unit-tests.yaml down
  
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
3. Отправка валидных данных на работающий и неработающий сервер    
Путь: [frontend/e2e/src/app-kivi-test-form.e2e-spec.ts](https://github.com/DevAleks/Kivi/tree/master/frontend/e2e/src/app-kivi-test-form.e2e-spec.ts)

### Работа с E2E тестами (через Docker и Docker-Compose)
1. Первый запуск: docker-compose -f dc-angular-e2e-tests.yaml up --build -d  
Последующие запуски: docker-compose -f dc-angular-e2e-tests.yaml up -d
2. Результаты тестов запишутся в файл frontend/logs.txt
3. Остановка: docker-compose -f dc-angular-e2e-tests.yaml kill;dc -f dc-angular-e2e-tests.yaml down
