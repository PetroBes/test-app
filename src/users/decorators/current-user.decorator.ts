import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../../models/user.entity';

export const CurrentUser = createParamDecorator(
  (data: never, ctx: ExecutionContext): User => {
    return ctx.switchToHttp().getRequest().user;
  },
);
