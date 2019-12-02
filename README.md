# Kivi-App, учебное приложение на Angular 8.3.0 
**Серверная часть на PHP и MySQL / unit-testing Jasmine + Karma / e2e testing Jasmine + Protractor**

Приложение Kivi-App представляет собой "набросок" будущего сайта и содержит 3 готовые страницы сайта:
* /
* /rafting
* /semeyniy-rafting

На всех страницах отличаются только верхние блоки с контентом.
Приложение сделано на основе сторонней верстки на Bootstrap 4.


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


### Серверная часть 
Обработка данных из форм производится PHP скриптом. 
При корректном выполнении сценария данные из форм записываются в БД на MySQL. Также скрипт модифицирует полученные данные, что служит маркером их успешного получения и отправляет их обратно в приложение.
При ошибке записи данных в БД сервер отправляет в приложение сообщение об ошибке.
Путь к скрипту обработки форм: [/backend/formbottom.php](https://github.com/DevAleks/Kivi/tree/master/backend/formbottom.php)

### Интеграции со сторонним кодом
В верстке страниц присутствуют:
* Вставка видео с Youtube
* "Карусель" Fancybox
* Виджет Vk



## Технологии
Приложение выполнено на Angular 8.3.0, серверная часть на PHP и MySQL, unit тестирование Jasmine + Karma, e2e тестирование Jasmine + Protractor.

### Элементы Angular
* Компоненты [/src/app/components/](https://github.com/DevAleks/Kivi/tree/master/src/app/components/)
* Сервисы [/src/app/services/](https://github.com/DevAleks/Kivi/tree/master/src/app/services/)
* Pipe [/src/app/pipes/](https://github.com/DevAleks/Kivi/tree/master/src/app/pipes/)
* Роутер [/src/app/app.module.ts](https://github.com/DevAleks/Kivi/tree/master/src/app/app.module.ts) (строка 41)
* Формы - валидатор с обработкой ошибок, отправка данных и получение ответа от сервера:
* - [/src/app/components/callorder-form/](https://github.com/DevAleks/Kivi/tree/master/src/app/components/callorder-form/)
* - [/src/app/components/first-form/](https://github.com/DevAleks/Kivi/tree/master/src/app/components/first-form/)
* - [/src/app/components/footer-form/](https://github.com/DevAleks/Kivi/tree/master/src/app/components/footer-form/)
* - [/src/app/components/question-form/](https://github.com/DevAleks/Kivi/tree/master/src/app/components/question-form/)
* - [/src/app/components/top-form/](https://github.com/DevAleks/Kivi/tree/master/src/app/components/top-form/)
* Получение данных из Json файла [/src/app/components/first-block/first-block.component.ts](https://github.com/DevAleks/Kivi/tree/master/src/app/components/first-block/first-block.component.ts) (строка 25)
* Вывод <script ...> в шаблонах. Обеспечивающий компонент[/src/app/components/scripthack](https://github.com/DevAleks/Kivi/tree/master/src/app/components/scripthack) и пример вывода в шаблоне [/src/app/components/subscribe-block/subscribe-block.component.html](https://github.com/DevAleks/Kivi/tree/master/src/app/components/subscribe-block/subscribe-block.component.html)
  


## Unit тестирование
Тестами покрыто примерно 80% всех функций. Код тестов содержится рядом с кодом приложения: /src/app/


## E2E тестирование
Разбито на 2 части. Покрыты только некоторые элементы страницы и проверены 3 коротких use case для форм обратной связи.
Код тестов расположен тут: [/e2e/src/](https://github.com/DevAleks/Kivi/tree/master/e2e/src/)

### Первая часть, элементы страницы
Тестами покрыта генерация различных типов элементов:
* Обычные элементы из шаблонов компонентов
* Элементы, подгружаемые из Json файла при загрузке приложения

А также проверяется корректность работы "карусели" и перехода по ссылке на другую страницу.
Путь: [/e2e/src/app.e2e-spec.ts](https://github.com/DevAleks/Kivi/tree/master/e2e/src/app.e2e-spec.ts)

### Вторая часть, формы обратной связи
Выполняется проверка 3 сценариев:
1. Открытие/закрытие модального окна одной из форм
2. Обработка 2-х ошибок корректности заполнения формы
3. Отправка валидных данных на работающий и неработающий сервер

Путь: [/e2e/src/app-kivi-test-form.e2e-spec.ts](https://github.com/DevAleks/Kivi/tree/master/e2e/src/app-kivi-test-form.e2e-spec.ts)
