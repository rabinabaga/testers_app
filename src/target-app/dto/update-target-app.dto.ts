import { PartialType } from '@nestjs/mapped-types';
import { CreateTargetAppDto } from './create-target-app.dto';

export class UpdateTargetAppDto extends PartialType(CreateTargetAppDto) {}
