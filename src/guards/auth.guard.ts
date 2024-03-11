import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  private static handleRequest(req) {
    if (!req.session.userId) {
      throw new UnauthorizedException();
    }
    return true;
  }

  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    return AuthGuard.handleRequest(req);
  }
}
