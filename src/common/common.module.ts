import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.entity';

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class CommonModule {}
