import { Field, InputType } from '@nestjs/graphql'
import { FilterOption } from '@shared/dto/filter-option.input'
import { IsNotEmpty } from 'class-validator'
import { UserSortEnum } from '../enum/user-sort.enum'

@InputType()
export class UsersFilterInput extends FilterOption {
  @Field(() => UserSortEnum, { description: 'Sắp xếp của bình luận' })
  @IsNotEmpty({ message: 'Sắp xếp là bắt buộc' })
  sort: UserSortEnum
}
