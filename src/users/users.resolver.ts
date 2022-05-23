import { Resolver, Args, Mutation } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { InputValidator } from '@shared/validator/input.validator'
import { UserInputError } from 'apollo-server-express'
import { SignUpTdo } from './dto/sign-up.tdo'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('input', new InputValidator()) input: SignUpTdo) {
    const user = await this.usersService.findOne({ email: input.email })
    if (user) {
      throw new UserInputError('Thành viên đã tồn tại')
    }
    return this.usersService.create(input)
  }
}
