import { Metadata } from '@grpc/grpc-js';
import { Observable, asyncScheduler, scheduled } from 'rxjs';
import { Controller } from '@nestjs/common';

import * as Contracts from 'contracts';
import { UpdatesService } from './updates.service';

@Controller()
@Contracts.UpdatesServiceControllerMethods()
export class UpdatesController implements Contracts.UpdatesServiceController {
  constructor(private readonly updatesService: UpdatesService) {}

  getAllRequests(
    _: Contracts.Empty,
    metadata?: Metadata,
  ): Observable<Contracts.GetAllUpdatesResponse> {
    return scheduled(this.updatesService.allUpdates(), asyncScheduler);
  }
}
