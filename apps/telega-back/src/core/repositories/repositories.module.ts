import { Module } from '@nestjs/common';
import { Telega } from 'orm';
import { IDataServices } from './abstaracts/data-services.abstract';
import { RepositoryServices } from './repositories.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Telega.Update, Telega.User, Telega.Message]),
  ],
  providers: [{ provide: IDataServices, useClass: RepositoryServices }],
  exports: [IDataServices],
})
export class RepositoriesModule {}
