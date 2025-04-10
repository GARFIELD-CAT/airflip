# airflip

## Описание

Веб-приложение для децентрализованного обмена токенов на EVM-сетях с поддержкой crosschain

## Технологии

### Backend

- python 3.12
- redis 5.2.1
- postgresql 13.3
- uvicorn 0.34.0
- fastapi 0.115.8
- sqlalchemy 2.0.39
- aiosqlite 0.21.0
- redis 5.2.1
- pydantic-settings 2.8.1
- asyncpg 0.30.0
- psycopg2-binary 2.9.10
- alembic 1.15.2

## Запуск проекта локально

### Backend

- Склонируйте репозиторий `git clone https://github.com/GARFIELD-CAT/airflip.git`
- Перейдите в папку проекта `airflip`
- Перейдите в папку `config`
- Создайте файлы .env в папках `pg_database` и `backend` с данными переменных окружения на основе шаблонов .env_prod_example. 
  - Сейчас достаточно просто убрать "_prod_example"
- Запустите docker контейнер `docker-compose up` для разворачивания сервиса
- Можно работать с API

## Работа с API

-  Документация по работе с API расположена по адресу http://localhost/api/openapi

## Запуск тестов
- Перейдите в папку проекта `airflip`
- Перейдите в папку `backend`
- Разверните venv окружение `py -3.12 -m venv venv`
- Активировать venv окружение `.\venv\Scripts\activate.bat`
  - Если используется PowerShell `.\venv\Scripts\Activate.ps1`
  - Если используете bash: `source ./venv/Scripts/activate`
- Установить poetry `pip install poetry`
- Установить зависимости `poetry install`
- Перейдите в папку `config`
- Создайте файлы .env в папках `pg_database` и `backend` с данными переменных окружения на основе шаблонов .env_prod_example. 
  - Сейчас достаточно просто убрать "_prod_example"
- Перейдите в папку проекта `airflip`
- Запустите docker контейнер `docker-compose up` для разворачивания сервиса
- После запуска сервиса перейдите в другое окно терминала
- Перейдите в папку `config\backend`
- Скопируйте значения ключей из `.env_test_example` и вставьте их в `.env`
  - Это нужно, чтобы тесты коннектились к базе.
- Перейдите в папку `backend`
- Активировать venv окружение по инструкции выше
- Запустите тесты командой `pytest -v .`

## Авторы

- backend: Ягунов Денис
- frontend: Миронов Эрнест
- дизайн: Самелюк Юрий
