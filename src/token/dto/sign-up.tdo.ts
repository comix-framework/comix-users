import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, MinLength } from 'class-validator'
import { SignInTdo } from './sign-in.tdo'

@InputType()
export class SignUpTdo extends SignInTdo {
  @Field()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  @MinLength(3, { message: 'Tên phải có ít nhất 3 ký tự' })
  name: string
}
