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

  @MessagePattern('user:verifyJWT')
  async verifyJWT(@Payload() data: any, @Ctx() context: RmqContext) {
    return this.usersService.findOne({ _id: data.id })
  }
}
