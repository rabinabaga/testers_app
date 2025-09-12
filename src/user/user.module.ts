import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.entity';
import { ValidatorsModule } from 'src/validators/validators.module';
import { TargetAppModule } from 'src/target-app/target-app.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ValidatorsModule,
    TargetAppModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [MongooseModule],
})
export class UserModule {}
