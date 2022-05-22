import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { UsersFilterInput } from './filter-user.input'
import { IsNotEmpty } from 'class-validator'

export enum UserSearchEnum {
  NAME = 'name',
  EMAIL = 'email'
}

registerEnumType(UserSearchEnum, {
  name: 'UserSearchEnum'
})

@InputType()
export class SearchFilterUserInput extends UsersFilterInput {
  @Field(() => String, { nullable: true, defaultValue: '' })
  keyword: string

  @Field(() => UserSearchEnum, {
    nullable: true,
    defaultValue: UserSearchEnum.NAME
  })
  @IsNotEmpty({ message: 'Trường tìm kiếm là bắt buộc' })
  field: UserSearchEnum
}
