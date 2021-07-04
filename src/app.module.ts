import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { GalleryModule } from './gallery/gallery.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';
import { mongoDBUri } from './config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..', 'tmp', 'images'),
    }),
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
