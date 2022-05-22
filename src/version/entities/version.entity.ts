import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Version {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
