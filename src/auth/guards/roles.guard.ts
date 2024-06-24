import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log("inside the roles guard");

    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(requiredRoles);
    
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);

    // Check if the user's roles include any of the required roles
    const hasRole = () => user.roles.some((role: string) => requiredRoles.includes(role));
    
    return user && user.roles && hasRole();
  }
}
