import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/pilot_tester')],
  exports: [MongooseModule], // Export so other modules can use it
})
export class MongooseConfigModule {}
