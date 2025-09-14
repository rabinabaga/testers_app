import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TargetAppService } from './target-app.service';
import { CreateTargetAppDto } from './dto/create-target-app.dto';
import { UpdateTargetAppDto } from './dto/update-target-app.dto';

@Controller('target-app')
export class TargetAppController {
  constructor(private readonly targetAppService: TargetAppService) {}

  @Post()
  create(@Body() createTargetAppDto: CreateTargetAppDto) {
    return this.targetAppService.create(createTargetAppDto);
  }

  @Get()
  findAll() {
    return this.targetAppService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.targetAppService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTargetAppDto: UpdateTargetAppDto) {
    return this.targetAppService.update(+id, updateTargetAppDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.targetAppService.remove(+id);
  }
}
