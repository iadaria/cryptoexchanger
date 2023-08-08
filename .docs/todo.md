# ended

4 | 3 | 2 pomodoro front
4 | 3 | 2 pomodoro back

- start with back

- front: effector-next: https://github.com/effector/next

- add prettier for admin-front + debug error

- common envs for all projects

- added @graphql-typed-document-node/core temporary. May be need to delete.

- https://graphql.org/learn/queries/
- https://www.apollographql.com/blog/graphql/examples/4-simple-ways-to-call-a-graphql-api/
- https://graphql.org/graphql-js/graphql-clients/
- https://stepzen.com/docs/using-graphql/making-queries-with-fetch
- Fetch users from graphql https://hygraph.com/blog/nextjs-graphql
  https://github.com/effector/next
  add effector for result of queries or simple effector
  Todo users getting form in front-end by nextjs. Edit too.
  Ended on micro-admin-back, doing resolves and what should be in api-gateway

# 0 Stopped

1 Делим на микросервисы api-gate, telega, web-server
2 Отображаем пользователей, можно через ssr
3 Далее 1.6 может лучше 1.7 иначе забуду что хотела разделить
4 Для пользователя с паролем создать отдельную таблицу, иначе меняется смысл(пароль, почта)
5 Имена баз данных ? Погуглить
6 nestjs/graphql не нужен в micro-telegram
7 пройтись по всем проектам и найти неиспользуемые библиотеки и сразу удалить

? Подумать над похожим кодом, например подключение к бд, может вынести в отдельную либу
посмотреть примеры
! env repeats in a few projects

Закончили на micro-telega-back нужно закончить перенос и запустить

# 1

1 Front: Show users (css)
2 (After split in few services)Front: Tabs or others to switch users <-> BotUsers
3 Front + back: Show botusers => microservices
4 ! Front + back: google authenticate
5 Front: Show inputs => after microservices
6 ! Test: add new input to postgress and check it
7 ! split in microservices
8 ! split code of users and auth (see NextJS-NestJS-Graphql example)
...
1001 Microfrontend (video, courses, chats info, books)

# 1.1

1 test: send a message from test number (99663..) and fix it on db

# 2

1 Services: bot, api-web, back-for-web
2 Docker

# 3 Reserching

1 https://the-guild.dev/graphql/codegen/docs/guides/react-vue
2 libs from NextJS-NestJS-GraphQL-Starter: @graphql-codegen/typescript-operations and ..

# courses

1 Nextjs purple
2 Nomade
3 Docker purple
4 Mickroservice purple repeat
