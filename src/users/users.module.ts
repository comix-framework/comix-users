import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserEntity } from './entities/user.entity'

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserEntity
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-slug-generator'))
          return schema
        }
      }
    ])
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
