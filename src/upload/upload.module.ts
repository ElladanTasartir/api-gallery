import { Module } from '@nestjs/common';
import { LocalService } from './local.service';

@Module({
  providers: [LocalService],
  exports: [LocalService],
})
export class UploadModule {}
