import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GalleryModule } from './gallery/gallery.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';
import { mongoDBUri } from './config';

@Module({
  imports: [
    MongooseModule.forRoot(
      mongoDBUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    UserModule,
    GalleryModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
