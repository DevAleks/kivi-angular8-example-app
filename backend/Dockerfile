FROM php:7-apache
RUN docker-php-ext-install pdo_mysql mysqli
# Включаем девелоперский режим, php.ini-development вместо php.ini  (dc logs -f backend)
RUN cp $PHP_INI_DIR/php.ini-development $PHP_INI_DIR/php.ini
