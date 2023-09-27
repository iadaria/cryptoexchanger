https://www.youtube.com/watch?v=_c1OLRG-t2o
https://www.youtube.com/playlist?list=PLJ8v-58rML8_p8vCXjoGVCltwhkmgdMVd
https://www.youtube.com/@devschacht/videos

- Logger ? How to work with ?
- update nestjs in all apps
- настраиваем сервис telegram
- записываем все запросы к боту в таблицу
- на фронте их отображаем
- делаем авторизацию на фронте через гугл и jwt
- redis

# error

- ошибку перехватываю и получаю нужные поля, теперь изучаем GraphqQL исключения и как и обрабатывать
  на стороне фронта https://www.apollographql.com/docs/apollo-server/data/errors/

* изучить ошибку которую дает graphql на api-gateway
* message ErrorResponse language:"Protocol Buffer"
* oneof response https://www.vinsguru.com/grpc-error-handling/

* https://github.com/googleapis/googleapis/blob/dd546bf83f7aa6dd24e17d3e83d9a397a6dd680c/google/ads/googleads/v14/errors/errors.proto#L180
  // https://github.com/KieronQuinn/AmbientMusicMod/blob/72753711944573bcf16fd0bb0f54ac849babc8ce/astrea/src/main/proto/status.proto#L42

```protobuf
message Status {
  // The status code, which should be an enum value of
  // [google.rpc.Code][google.rpc.Code].
  int32 code = 1;

  // A developer-facing error message, which should be in English. Any
  // user-facing error message should be localized and sent in the
  // [google.rpc.Status.details][google.rpc.Status.details] field, or localized
  // by the client.
  string message = 2;

  // A list of messages that carry the error details.  There is a common set of
  // message types for APIs to use.
  repeated google.protobuf.Any details = 3;
}
```

!! - разобраться с ошибками в grpc и ok и error в dto
https://dev.to/antoncodes/nestjs-stop-handling-errors-like-this-2446

-- удалить библиотеки graphql неиспользуемые в микросервисах
-- решить что-то с типами между
-- вынести сервис UsersServices в отдельный сервис ? для guard или делать проверку на стороне auth сервиса?
-- telega-micros тоже сделать сервисы
-- изучить примеры сервисов auth и сделать также с cqrs

- что такое rxjs изучить, курсы какие
- rxjs scheduled и from зачем? + новое потом из nestjs docs

- resolve и request,
- between requests,
- ? bring out declarations of db entities?

# ended 0

- creating AuthController services
- researching others services,
- read and translate doc
- empty protobuf request. Come up with the decision
- error https://protobuf.dev/programming-guides/proto3/
- request github: package auth;/service AuthService language:"Protocol Buffers"
- https://cloud.google.com/apis/design/errors#error_model
- https://grpc.io/docs/guides/error/
- https://github.com/googleapis/googleapis/blob/master/google/rpc/status.proto
- filter exception https://stackoverflow.com/questions/72518203/nestjs-global-exception-filter-not-catching-anything-thrown-from-a-kafka-based

# ended

Promise vs Observer https://stackoverflow.com/questions/37364973/what-is-the-difference-between-promises-and-observables

#

4 / 3 / 2 p. front
4 / 3 / 2 p. back

- proto https://www.npmjs.com/package/ts-proto#nestjs-support

- start with back
- generate types from proto:
  -- https://www.npmjs.com/package/nestjs-proto-gen-ts
- todo microservice in admin-back

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
5 Имена баз данных ? Google it
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

# nginx proxy manager

https://nginxproxymanager.com/guide/#quick-setup

# docker

portainer.io

? cqrs nestjs
? rxjs scheduled observable - nestjs observable -
? https://stackoverflow.com/questions/70378974/how-to-use-rxjs-observables-inside-nestjs-application-w-o-controller
? https://www.youtube.com/watch?v=LcHxvDLaUbw
? https://www.youtube.com/watch?v=PXoWHqKtHGA
