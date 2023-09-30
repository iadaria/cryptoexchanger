import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from './jwt.service';
import * as Contract from 'contracts';
import { firstValueFrom } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  private usersService: Contract.UsersServiceClient;
  constructor(
    private readonly jwtService: JwtService,
    @Inject(Contract.GrpcClient.AUTH) private users: ClientGrpc,
  ) {}

  onModuleInit() {
    this.usersService = this.users.getService<Contract.UsersServiceClient>(
      Contract.USERS_SERVICE_NAME,
    );
  }

  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      const decoded = this.jwtService.verify(token.toString());
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        try {
          const { user } = await firstValueFrom(
            this.usersService.findUser(decoded['id']),
          );

          console.log('[jwtMiddleware]', { user });

          if (user) {
            req['user'] = user;
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
    next();
  }
}
