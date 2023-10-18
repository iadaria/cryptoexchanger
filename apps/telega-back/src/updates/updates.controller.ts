import { Metadata } from '@grpc/grpc-js';
import { Observable, asyncScheduler, scheduled } from 'rxjs';
import { Controller } from '@nestjs/common';

import { UpdatesService } from './updates.service';
import {
  Empty,
  GetAllUpdatesResponse,
  UpdatesServiceController,
  UsersServiceControllerMethods,
} from 'contracts';

@Controller()
@UsersServiceControllerMethods()
export class UpdatesController implements UpdatesServiceController {
  constructor(private readonly updatesService: UpdatesService) {}

  getAllRequests(
    _: Empty,
    metadata?: Metadata,
  ):
    | Promise<GetAllUpdatesResponse>
    | Observable<GetAllUpdatesResponse>
    | GetAllUpdatesResponse {
    return scheduled(this.updatesService.allUpdates(), asyncScheduler);
  }
}
