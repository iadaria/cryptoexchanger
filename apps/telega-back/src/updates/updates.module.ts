import { Module } from '@nestjs/common';
import { UpdatesService } from './updates.service';
import { RepositoriesModule } from 'src/core/repositories/repositories.module';
import { UpdatesController } from './updates.controller';

@Module({
  imports: [RepositoriesModule],
  providers: [UpdatesService],
  exports: [UpdatesService],
  controllers: [UpdatesController],
})
export class UpdatesModule {}
