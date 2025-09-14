import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfigs } from './config/app.config';
import { CommonModule } from './common/common.module';
import { Validator } from 'class-validator';
import { ValidatorsModule } from './validators/validators.module';
import { MongooseConfigModule } from './mongoose.module';
import { TargetAppModule } from './modules/target-app/target-app.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(appConfigs),
    MongooseConfigModule,
    CommonModule,
    ValidatorsModule,
    TargetAppModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
