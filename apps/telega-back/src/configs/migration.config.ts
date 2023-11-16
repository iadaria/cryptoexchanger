import { DataSource } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

import { Chat, Message, Update, TgUser } from 'orm';
import { getEnvironmentFileName } from 'common';

dotenvConfig({ path: getEnvironmentFileName() });

export default new DataSource({
  type: 'postgres',
  url: process.env.DB_CONNECTION, // TODO type
  entities: [TgUser, Message, Update, Chat],
  migrations: [__dirname + '/../migrations/*.ts'],
});
