import { Module } from '@nestjs/common';
import { TargetAppService } from './target-app.service';
import { TargetAppController } from './target-app.controller';
import { TargetAppRepository } from './target-app.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { TargetApp, TargetAppSchema } from './entities/target-app.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TargetApp.name, schema: TargetAppSchema },
    ]),
  ],
  controllers: [TargetAppController],
  providers: [TargetAppService, TargetAppRepository],
  exports: [MongooseModule],
})
export class TargetAppModule {}
