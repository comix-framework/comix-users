import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ApolloModule } from '@apollo/apollo.module'
import { DatabaseModule } from '@database/database.module'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { TokenModule } from './token/token.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ApolloModule,
    UsersModule,
    TokenModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
