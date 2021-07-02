import { Module } from '@nestjs/common';
import { UploadModule } from 'src/upload/upload.module';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';

@Module({
  imports: [UploadModule],
  controllers: [GalleryController],
  providers: [GalleryService]
})
export class GalleryModule {}
