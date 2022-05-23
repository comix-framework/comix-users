import { Injectable } from '@nestjs/common'
import { JwtStrategy } from '@comico/auth'
import { TokenService } from '../token.service'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class TokenStrategy extends JwtStrategy {
  constructor(
    protected authService: TokenService,
    protected configService: ConfigService
  ) {
    super(authService, configService)
  }
}
