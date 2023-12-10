import { Test, TestingModule } from '@nestjs/testing';
import { TronService } from './tron.service';
import { TRON_OPTIONS } from 'src/common/common.constants';

const ENV = {
  network: 'https://api.nileex.io',
  contract: 'TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf',
  toAddress: 'TSG4BtfPMeycE5jQeG4CPJ2p1C8iRXug4W',
  privateKey: '00fd04ef2ad20071df945053a353504892ac264c24aa962444a30177b599b2cf',
  fromAddress: 'TVDCuKiJiQGDsAZpNAK5kbwihEJqdVLhcf',
  minTrx: 12,
};

describe('TronService', () => {
  let tronService: TronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TRON_OPTIONS,
          useValue: {
            network: ENV.network,
            contract: ENV.contract,
            toAddress: ENV.toAddress,
            privateKey: ENV.privateKey,
            minTrx: ENV.minTrx,
          },
        },
        TronService,
      ],
    }).compile();

    tronService = module.get<TronService>(TronService);
  });

  it('should be defined', () => {
    expect(tronService).toBeDefined();
  });

  describe('?', () => {
    it('Default address is right', () => {
      expect(tronService.defaultAddress).toEqual(ENV.fromAddress);
    });

    it('Sufficient balance usdt', async () => {
      const balance = await tronService.getBalance(ENV.fromAddress);
      console.log({ address: ENV.fromAddress, balance: +balance / 10 ** 6 });
      expect(+balance).toBeGreaterThan(0);
    });

    it('Sufficient balance trx', async () => {
      const balance = await tronService.getTrxBalance(ENV.fromAddress);
      console.log({ address: ENV.fromAddress, balance: +balance / 10 ** 6 });
      expect(+balance).toBeGreaterThan(0);
    });

    it('Send 1 usdt to the address', async () => {
      const amount = BigInt(10 ** 6); // equals to 1 usdt
      const result = await tronService.sendTransaction(1, ENV.fromAddress, ENV.toAddress, amount);
      console.log({ result });
      expect(result).toBeDefined();
    });
  });
});
