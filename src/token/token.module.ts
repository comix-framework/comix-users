import { JWT_MODULE, AUTH_SERVICE } from '@comico/auth'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { TokenService } from './token.service'
import { TokenStrategy } from './passport/token.strategy'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    AUTH_SERVICE,
    JWT_MODULE,
    ConfigModule,
    PassportModule,
    UsersModule
  ],
  providers: [TokenStrategy, TokenService]
})
export class TokenModule {}
