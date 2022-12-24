# Шаблон проекта с сервером на Node.js

  

## Содержание шаблона
* Сервер на express (с настроенными CORS)
* Модуль авторизации на Спортсе
* Socket.IO
* MySQL
* TypeScript с линтером
* Sentry

## Перед запуском

Перед запуском проекта нужно создать новый проект в [Sentry](https://sentry.sports.ru/sports_ru/) в команде special и обновить переменную SENTRY_DATA_SOURCE_NAME (появится после создания проекта) в файле .env

## Запуск сервера на локальной машине

Для запуска приложения необходимо установить Docker и выполнить команду:
```
docker-compose up
```
Затем нужно создать пользователя и выдать ему соотвестующие права.
Для этого:
1. Скачиваем [DBeaver](https://dbeaver.io/)
2. Для создания нового подключения нажимаем на вилку в левом углу. <br>
   <img src="https://sports.ru/storage/dumpster/0/07/305b4818c8708b0855cfd171bef40.png" width="50%">
3. В открывшемся окне выбираем MySQL и нажимаем "Next"
4. Заполняем поля localhost, port и username или оставляем их по умолчанию. В поле password прописываем пароль - <b>password</b>. И нажимаем Finish.<br>
   <img src="https://sports.ru/storage/dumpster/3/af/b45a93fc6f9692b7be576bee11be7.png" width="50%">
5. В новом подключении выбираем Users, и в контекстном меню выбираем Create New User<br>
   <img src="https://www.sports.ru/storage/dumpster/9/77/ab63f037f8fe1896244748e5f2db4.png" width="50%">
6. Заполняем поля User Name = user, password = password, confirm = password. Так же нажимаем Check All, чтобы выдать все права.<br>
   <img src="https://sports.ru/storage/dumpster/d/24/24483c331c8b16b54cff9b385908e.png" width="50%">
7. На вкладке Schema Privileges выдаем все права для % (All) и для нашей базы данных, в данном примере это json-admin-backend<br>
   <img src="https://sports.ru/storage/dumpster/3/af/b45a93fc6f9692b7be576bee11be7.png" width="50%">
8. Для сохранения изменений нужно нажать комбинацию клавиш CTRL+F, в появившемся окне выбрать Persist
9. Удачной разработки!

Docker Compose состоит из трех сервисов:

- Express сервер
- Сервер бд mysql
- Сервис миграции схемы бд

## Сервис миграции схемы бд

Данный сервис позволяет производить контролируемые изменения в схему базы данных.
Для каждой миграции должно существовать 2 файла:
- up файл с изменениями в схему бд
- down файл, которые отменяет изменения текущей миграции

Правило нейминга:
```
{version}_{title}.up.{extension}
{version}_{title}.down.{extension}
```
[Подробнее о нейминге и небольшой F.A.Q](https://github.com/golang-migrate/migrate/blob/master/MIGRATIONS.md)

Скрипты миграции (с примерами) находятся в папке migrations/script.

[Полная документация инструмента](https://github.com/golang-migrate/migrate)

Так как миграция присутствует в docker-compose.yml как один из сервисов, она проходит при запуске всего приложения (docker-compose up).
Также можно провести миграцию отдельно от Docker Compose, [выполнив команду](https://github.com/golang-migrate/migrate#docker-usagest_db%22%20up) в командной строке:
```
docker run -v /Users/user/Documents/sports/server-with-ts/migrations/scripts:/migrations --network host migrate/migrate -path=/migrations/ -database "mysql://user:password@tcp(localhost:3306)/test_db" up
```

## Еще несколько полезных команд
Они могут быть полезны при работе с Докером
  

##### Собрать докер-образ
```
docker build . -f Dockerfile_local -t node
``` 
##### Пересобрать образ одного из docker-compose сервиса 
```
docker-compose up --build $service-name
```
##### Создать сеть
```
docker network create server-with-ts-network
```
##### Запустить контейнер с указанием сети
```
docker run -it -p 3000:3000 --network server-with-ts-network node

```
##### Запустить mysql контейнер

```
docker run --rm -d --name mysql_server -p 3307:3306 -e MYSQL_DATABASE='test_db' -e MYSQL_USER='user' -e MYSQL_PASSWORD='password' -e MYSQL_ROOT_PASSWORD='password' --network server-with-ts-network mysql:8.0
```

##### Зайти внутрь файловой системы запущенного контейнера
```
docker exec -it $container-name sh
```
