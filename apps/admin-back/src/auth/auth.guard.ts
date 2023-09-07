import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { AllowedRoles } from './role.decorator';
import { JwtService } from 'src/jwt/jwt.service';
import { UsersService } from 'src/users/users.service';

// Is this using?

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly relfector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userSerivice: UsersService,
  ) {}

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
        const { user } = await this.userSerivice.findById(decoded['id']);

        if (!user) {
          return false;
        }

        gqlContext['user'] = user;
        if (roles.includes('Any')) {
          return true;
        }

        return roles.includes(user.role);
      }
    }

    return false;
  }
}
