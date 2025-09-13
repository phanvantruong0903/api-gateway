import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'user',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, './proto/user.proto'),
          url: '0.0.0.0:50051',
        },
      },
    ]),
    AuthModule,
  ],
})
export class AppModule {}
