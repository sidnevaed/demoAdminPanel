
ОПИСАНИЕ ПРОЕКТА

Это pet-проект, на основе которого есть реальный работающий проект.
По согласованию с заказчиком предоставляю код в сокращенном виде с немного измененной логикой.

Создание Single-page Application (админки) для одного авторизованного пользователя в следующих целях:

- управления списками игроков мобильной игры с помощью таблицы рейтингов (с использованием сортировки, паджинации и строки поиска).
- создания новых игроков для участия в игре.
- редактирования их данных.
- экспорта данных с сервера в формат Excel.

Используемые библиотеки и решения:

1. Верстка (SCSS, CSS Grid, Flexbox, media queries)
2. UI (React Table Library, Material UI)
3. Управление аутентификацией (Google Firebase, Redux)
4. Создание таблиц (Formik, yup)
5. Управление state (React, Redux, AsyncThunk)
6. Взаимодействие с сервером (axios)
7. Экспорт данных (React-csv)
8. Типизация (Typescript).

Список функций в виде выполненного технического задания:

1. Создать приложение с помощью React Router и определить paths.
2. Зарегистрировать приложение в Google Firebase и подключить Аутентификацию для приложения.
3. С Главной страницы сделать ссылку на авторизацию.
4. Создать формы авторизации и регистрации (поля email и пароль) с валидацией (отсутствие незаполненных пустых полей, валидный формат email, 
валидация количества символов пароля). Форма регистрации создана в рамках демо-версии, в реальном проекте - была только форма авторизации.
5. В случае успешной авторизации (или регистрации) пользователь перенаправляется на страницу с таблицей "Список игроков".
   Либо появляется сообщение об ошибках со стороны пользователя либо проблемы, возникшие на сервере.
6. Таблица "Список игроков" содержит следующие поля:
   Имя игрока
   Фамилия игрока
   Email игрока
   Максимальный балл
   Дата последней игры
   Открыт доступ к игре?

7. По клику на кнопку "Зарегистрировать нового пользователя" пользователь переходит на новую страницу, в которой есть
   таблица "Создать нового пользователя".
8. В вышеуказанной таблице создать поля: Имя пользователя, Фамилия пользователя и его email. Для данной таблицы также использовать валидацию 
(валидный формат email, отсутствие незаполненных пустых полей, требования к минимальному количеству символов в имени и фамилии).
9. По клику на кнопку "Создать" пользователь возвращается на страницу со "Списком игроков" и видит уже внесенные изменения
   в данную таблицу (отправка данных на API Firebase и их получение).
   Поля: "Максимальный балл", "Дата последней игры", "Открыт доступ к игре?" должны генерироваться случайным образом (использовано только 
в рамках демо-версии). Эти данные также должны вноситься в таблицу "Список игроков".
10. Пользователь может изменить данные таблицы по клику на соответствующую колонку (по конкретному игроку), при этом при наведении курсора на row выводится
    подсказка, что поле можно редактировать.
11. По клику на соответствующую колонку, пользователь переходит на новую страницу, где он может вносить изменения в таблицу.
    Доступны для изменения следующие поля:
    -Имя пользователя
    -Фамилия пользователя
    -Email
    -Открыт доступ к игре.

12. В таблице "Внести изменения в таблицу" в поля для ввода в качестве дефолтных значений указаны подгруженные с сервера данные
    о конкретном игроке.
13. По клику на кнопку "Изменить данные пользователя" пользователь отправляется на страницу "Список игроков", в котором были актуа-
    лизированы его данные.
14. Создать кнопку "Отправить в Excel", по клику на которую пользователь получает актуальные данные по игрокам из таблицы с сервера.
15. Создать сортировку по каждому полю таблицы (по возрастанию и убыванию).
16. Создать поле поиска данных по фамилии.
17. Создать паджинацию данных (по заданному количеству игроков, а также возможность показать всех игроков).
18. В колонке "Максимальный балл" красным цветом выделить цифру, тех игроков, кто не прошел тест, а зеленым - для тех, кто прошел.
19. С помощью Redux и Google Firebase сделать protected routes для страниц со "Списком игроков", "Создать нового пользователя",
    "Внести изменения в таблицу." При истечении срока авторизации (1 час) пользователь попадает на Главную страницу.
20. Создать кнопку "Выход" во всех protected routes, по клику на которую пользователь переходит на Главную страницу и ему нужно заново проходить авторизацию.
21. Сделать адаптивную и кросс-браузерную верстку.


