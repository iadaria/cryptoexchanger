import { Inject } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import * as Contract from 'contracts';
import { GetUpdatesOutput } from './dtos/get-updates.dto';
import { firstValueFrom } from 'rxjs';

export class UpdatesResolver {
  private updatesService: Contract.UpdatesServiceClient;

  constructor(
    @Inject(Contract.GrpcClient.TELEGA) private updates: ClientGrpc,
  ) {}

  onModuleInit() {
    this.updatesService =
      this.updates.getService<Contract.UpdatesServiceClient>(
        Contract.UPDATES_SERVICE_NAME,
      );
  }

  @Query((returns) => GetUpdatesOutput)
  getUpdates(): Promise<GetUpdatesOutput> {
    return firstValueFrom(this.updatesService.getAllRequests({}));
  }
}
