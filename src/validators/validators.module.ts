import { Global, Module } from '@nestjs/common';
import { IsUniqueConstraint } from './validators.service';

@Global()
@Module({
  providers: [IsUniqueConstraint],
  exports: [IsUniqueConstraint],
})
export class ValidatorsModule {}
