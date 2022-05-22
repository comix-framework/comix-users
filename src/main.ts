import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const logger = new Logger('Microservice')

  const app = await NestFactory.create(AppModule)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'users_queue',
      queueOptions: {
        durable: false
      }
    }
  })

  const configService = app.get(ConfigService)

  await app.startAllMicroservices()
  await app.listen(configService.get('PORT'))

  logger.verbose('Microservice is listening')
}
bootstrap()
