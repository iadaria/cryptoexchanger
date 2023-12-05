import { Test, TestingModule } from '@nestjs/testing';
import { TronService } from './tron.service';
import { TRON_OPTIONS } from '../common/common.constants';

describe('TronService', () => {
  let service: TronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TRON_OPTIONS,
          useValue: {
            network: 'https://api.nileex.io/',
            contract: 'TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs',
            toAddress: 'TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf',
            privateKey:
              '00fd04ef2ad20071df945053a353504892ac264c24aa962444a30177b599b2cf',
          },
        },
        TronService,
      ],
    }).compile();

    service = module.get<TronService>(TronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
