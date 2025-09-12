import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfigs } from './config/app.config';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { Validator } from 'class-validator';
import { ValidatorsModule } from './validators/validators.module';
import { MongooseConfigModule } from './mongoose.module';

@Module({
  imports: [
    ConfigModule.forRoot(appConfigs),
    MongooseConfigModule,

    UserModule,
    CommonModule,
    ValidatorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
