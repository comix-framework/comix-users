import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { VersionService } from './version.service'
import { Version } from './entities/version.entity'
import { CreateVersionInput } from './dto/create-version.input'
import { UpdateVersionInput } from './dto/update-version.input'

@Resolver(() => Version)
export class VersionResolver {
  constructor(private readonly versionService: VersionService) {}

  @Mutation(() => Version)
  createVersion(
    @Args('createVersionInput') createVersionInput: CreateVersionInput
  ) {
    return this.versionService.create(createVersionInput)
  }

  @Query(() => [Version], { name: 'version' })
  findAll() {
    return this.versionService.findAll()
  }

  @Query(() => Version, { name: 'version' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.versionService.findOne(id)
  }

  @Mutation(() => Version)
  updateVersion(
    @Args('updateVersionInput') updateVersionInput: UpdateVersionInput
  ) {
    return this.versionService.update(updateVersionInput.id, updateVersionInput)
  }

  @Mutation(() => Version)
  removeVersion(@Args('id', { type: () => Int }) id: number) {
    return this.versionService.remove(id)
  }
}
