import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/entities/user.entity';

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class CommonModule {}
