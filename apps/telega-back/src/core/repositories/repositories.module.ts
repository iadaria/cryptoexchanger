import { Module } from '@nestjs/common';
import { IDataServices } from './abstaracts/data-services.abstract';
import { RepositoryServices } from './repositories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message, TgUser, Update } from 'orm';

@Module({
  imports: [TypeOrmModule.forFeature([Update, TgUser, Message])],
  providers: [{ provide: IDataServices, useClass: RepositoryServices }],
  exports: [IDataServices],
})
export class RepositoriesModule {}
