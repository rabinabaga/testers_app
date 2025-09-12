import { Injectable } from '@nestjs/common';
import { CreateTargetAppDto } from './dto/create-target-app.dto';
import { UpdateTargetAppDto } from './dto/update-target-app.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TargetAppRepository } from './target-app.repository';

@Injectable()
export class TargetAppService {
  constructor(private readonly targetAppRepository: TargetAppRepository) {}
  create(createTargetAppDto: CreateTargetAppDto) {
    return this.targetAppRepository.createTargetApp(createTargetAppDto);
  }

  findAll() {
    return `This action returns all targetApp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} targetApp`;
  }

  update(id: number, updateTargetAppDto: UpdateTargetAppDto) {
    return `This action updates a #${id} targetApp`;
  }

  remove(id: number) {
    return `This action removes a #${id} targetApp`;
  }
}
