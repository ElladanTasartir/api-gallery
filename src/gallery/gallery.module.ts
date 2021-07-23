import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { UploadModule } from '../upload/upload.module';
import { UserSchema } from '../user/schemas/user.schema';
import { GalleryController } from './gallery.controller';
import { GalleryRepository } from './gallery.repository';
import { GalleryService } from './gallery.service';
import { GallerySchema } from './schemas/gallery.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'User',
      schema: UserSchema,
      collection: 'users',
    }, {
      name: 'Gallery',
      schema: GallerySchema,
    }]),
    UserModule,
    UploadModule,
  ],
  controllers: [GalleryController],
  providers: [GalleryRepository, GalleryService]
})
export class GalleryModule { }
