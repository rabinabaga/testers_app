import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfigs } from './config/app.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(appConfigs),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: 'mongodb://localhost:27017/pilot_tester',
          // uri: process.env.DATABASE_URL as string,

          // these two are automatically true in Mongoose v6+, but safe to keep:
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
