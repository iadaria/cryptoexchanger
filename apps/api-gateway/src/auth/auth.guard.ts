import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';

import { AllowedRoles } from './role.decorator';
import { JwtService } from 'src/jwt/jwt.service';
import * as Contract from 'contracts';
import { firstValueFrom } from 'rxjs';

// Is this using?

@Injectable()
export class AuthGuard implements CanActivate {
  private usersService: Contract.UsersServiceClient;
  constructor(
    private readonly relfector: Reflector,
    private readonly jwtService: JwtService,
    @Inject(Contract.GrpcClient.AUTH) private users: ClientGrpc,
  ) {}

  onModuleInit() {
    this.usersService = this.users.getService<Contract.UsersServiceClient>(
      Contract.USERS_SERVICE_NAME,
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.relfector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );

    if (!roles) {
      return true;
    }
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const token = gqlContext.token;
    if (token) {
      const decoded = this.jwtService.verify(token.toString());
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        const { user } = await firstValueFrom(
          this.usersService.findUser(decoded['id']),
        );

        console.log('[auth.guard]', { user });

        if (!user) {
          return false;
        }

        gqlContext['user'] = user;
        if (roles.includes('Any')) {
          return true;
        }

        return true;
        //return roles.includes(user.role);
      }
    }

    return false;
  }
}
