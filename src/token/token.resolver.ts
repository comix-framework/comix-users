import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { TokenService } from './token.service'
import { Token } from './entities/token.entity'
import { InputValidator } from '@shared/validator/input.validator'
import { SignInTdo } from './dto/sign-in.tdo'
import { UserInputError } from 'apollo-server-express'
import { UsersService } from '../users/users.service'
import { SignUpTdo } from './dto/sign-up.tdo'

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
}
