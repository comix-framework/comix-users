import { InputType } from '@nestjs/graphql'
import { SignUpTdo } from '../../token/dto/sign-up.tdo'

@InputType()
export class CreateUserInput extends SignUpTdo {}
