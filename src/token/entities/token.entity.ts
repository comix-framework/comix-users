import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Token {
  @Field({ description: 'JSON Web Token' })
  token: string
}
