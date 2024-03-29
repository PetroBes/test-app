import {
  NestInterceptor,
  CallHandler,
  Injectable,
  ExecutionContext,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(ctx: ExecutionContext, handler: CallHandler) {
    const request = ctx.switchToHttp().getRequest();
    const { userId } = request.session || {};
    if (userId) {
      const user = await this.usersService.findById(userId);
      request.currentUser = user;
    }

    return handler.handle();
  }
}
