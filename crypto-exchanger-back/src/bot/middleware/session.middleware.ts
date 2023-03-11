//import { session } from "telegraf";
//import RedisSession from "telegraf-session-redis";
const RedisSession = require('telegraf-session-redis')

//export const sessionMiddleware = session();
//export const sessionMiddleware = new PostgresSession()

export const sessionMiddleware = new RedisSession({
    store: {
      host: process.env.TELEGRAM_SESSION_HOST || '127.0.0.1',
      port: process.env.TELEGRAM_SESSION_PORT || 6379
    }
  }).middleware();