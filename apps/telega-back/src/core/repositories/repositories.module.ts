import { Module } from '@nestjs/common';
import { Tg } from 'orm';
import { IDataServices } from './abstaracts/data-services.abstract';
import { RepositoryServices } from './repositories.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tg.Update, Tg.User, Tg.Message])],
  providers: [{ provide: IDataServices, useClass: RepositoryServices }],
  exports: [IDataServices],
})
export class RepositoriesModule {}
