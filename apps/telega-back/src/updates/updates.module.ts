import { Module } from '@nestjs/common';
import { UpdatesService } from './updates.service';

@Module({
  imports: [],
  providers: [UpdatesService, UpdatesModule],
})
export class UpdatesModule {}
