import { Module } from '@nestjs/common';
import { UpdatesService } from './updates.service';
import { RepositoriesModule } from 'src/core/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  providers: [UpdatesService],
})
export class UpdatesModule {}
