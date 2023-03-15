import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BotUser } from "./entities/bot-user.entity";

export class BotUsersService {
  constructor(
    @InjectRepository(BotUser) private readonly users: Repository<BotUser>,
  ) {}

  
}