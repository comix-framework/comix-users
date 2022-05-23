import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TokenService } from './token.service'
import { Token } from './entities/token.entity'
import { SignInTdo } from '../users/dto/sign-in.tdo'
import { InputValidator } from '@shared/validator/input.validator'
import { UserInputError } from 'apollo-server-express'
import { SignUpTdo } from '../users/dto/sign-up.tdo'
import { UsersService } from '../users/users.service'
import { User } from '../users/entities/user.entity'
import { UseGuards } from '@nestjs/common'
import { CurrentUser, OptionAuthGuard } from '@comico/auth'

@Resolver(() => Token)
export class TokenResolver {
  constructor(
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService
  ) {}

  @Mutation(() => Token)
  async signIn(@Args('input', new InputValidator()) input: SignInTdo) {
    const user = await this.tokenService.validateUser(
      { email: input.email },
      input.password
    )
    if (!user) {
      throw new UserInputError('Email hoặc mật khẩu không đúng')
    }
    return {
      token: await this.tokenService.JWTGenerator(user)
    }
  }

  @Mutation(() => Token)
  async signUp(@Args('input', new InputValidator()) input: SignUpTdo) {
    const user = await this.usersService.findOne({ email: input.email })
    if (user) {
      throw new UserInputError('Thành viên đã tồn tại')
    }
    const newUser = await this.usersService.create(input)
    return {
      token: this.tokenService.JWTGenerator(newUser)
    }
  }

  @Query(() => User)
  @UseGuards(OptionAuthGuard)
  async getMe(@CurrentUser() user) {
    return user
  }
}
