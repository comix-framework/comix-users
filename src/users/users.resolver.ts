import { Resolver, Args, Mutation } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { InputValidator } from '@shared/validator/input.validator'
import { UserInputError } from 'apollo-server-express'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(
    @Args('input', new InputValidator()) input: CreateUserInput
  ) {
    const user = await this.usersService.findOne({ email: input.email })
    if (user) {
      throw new UserInputError('Thành viên đã tồn tại')
    }
    return this.usersService.create(input)
  }
}
