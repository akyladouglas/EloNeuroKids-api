import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@application/auth/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    // Supondo que user.roles seja um array de objetos ou strings.
    // Ajuste conforme sua entidade UserRole (se for complexa, mapeie antes).
    // Aqui assumo que o payload do JWT já traz um array de nomes de roles ['ADMIN', 'PROFESSIONAL']
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
