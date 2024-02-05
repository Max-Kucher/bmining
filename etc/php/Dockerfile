ARG PHP_VERSION

# Используйте подходящий базовый образ PHP
FROM nanoninja/php-fpm:${PHP_VERSION}

# Установите необходимые зависимости для Electrum
RUN apt-get update;
RUN apt-get install -y python3-pip;
RUN apt-get install -y python3-setuptools python3-pyqt5 libsecp256k1-dev;
RUN pip install protobuf==3.20.*;
RUN pip3 install https://download.electrum.org/4.1.2/Electrum-4.1.2.tar.gz#egg=electrum[fast];

#electrum daemon -d

COPY ./etc/php/php.ini /usr/local/etc/php/conf.d/php.ini

RUN apt-get update && apt-get install -y net-tools;

WORKDIR /var/www/html
