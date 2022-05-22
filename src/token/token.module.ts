import { Module } from '@nestjs/common'
import { TokenService } from './token.service'
import { TokenResolver } from './token.resolver'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './passport/constants'
import { JwtStrategy } from './passport/jwt.strategy'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3d' }
    }),
    UsersModule
  ],
  providers: [TokenResolver, TokenService, JwtStrategy]
})
export class TokenModule {}
