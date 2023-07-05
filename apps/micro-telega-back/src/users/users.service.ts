import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as TelegrafUser} from 'telegraf/typings/core/types/typegram';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly users: Repository<User>) {}

  async newUser(from: TelegrafUser) {
    try {
      const exist = await this.users.findOneBy({ id: from.id });
      if (!exist) {
        const newUser = this.users.create({ ...from });
        const user = await this.users.save(newUser);
        console.log('created user successfuly', { user });
      }
    } catch (e) {
      console.log("Couldn't create account", e);
    }
  }

  async allBotUsers() {
    try {
      const users = await this.users.find();
      return users;
    } catch (error) {
      console.log("Couldn't get bot users", { error });
    }
  }
}
