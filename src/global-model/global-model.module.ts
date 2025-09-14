// model.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ModelService } from './model.service';
import { User, UserSchema } from 'src/modules/auth/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [ModelService],
  exports: [ModelService],
})
export class ModelModule {}
