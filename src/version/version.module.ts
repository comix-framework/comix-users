import { Module } from '@nestjs/common'
import { VersionService } from './version.service'
import { VersionResolver } from './version.resolver'

@Module({
  providers: [VersionResolver, VersionService]
})
export class VersionModule {}
