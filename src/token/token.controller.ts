import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'
import { Controller } from '@nestjs/common'
import { TokenService } from './token.service'
import { UsersService } from '../users/users.service'

@Controller()
export class TokenController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService
  ) {}

  @MessagePattern('auth')
  getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {
    console.log(`Pattern: ${context.getPattern()}`)
  }
}
