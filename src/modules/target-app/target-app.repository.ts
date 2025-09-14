import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { TargetApp } from './entities/target-app.entity';
import { CreateTargetAppDto } from './dto/create-target-app.dto';
@Injectable()
export class TargetAppRepository {
  constructor(
    @InjectModel(TargetApp.name)
    private readonly targetAppModel: Model<TargetApp>,
  ) {}

  async createTargetApp(
    createTargetAppDto: CreateTargetAppDto,
  ): Promise<TargetApp> {
    const newTargetApp = new this.targetAppModel({
      ...createTargetAppDto,
      submittedBy: new Types.ObjectId(createTargetAppDto.submittedBy),
    });
    return newTargetApp.save();
  }
}
