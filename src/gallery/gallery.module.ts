import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GallerySchema } from 'src/schemas/gallery.schema';
import { UserModule } from 'src/user/user.module';
import { UserSchema } from '../schemas/user.schema';
import { UploadModule } from '../upload/upload.module';
import { GalleryController } from './gallery.controller';
import { GalleryRepository } from './gallery.repository';
import { GalleryService } from './gallery.service';

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
    UploadModule
  ],
  controllers: [GalleryController],
  providers: [GalleryService, GalleryRepository]
})
export class GalleryModule { }
