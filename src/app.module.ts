import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoDbURI } from './config';
import { GalleryModule } from './gallery/gallery.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'tmp', 'images'),
    }),
    MongooseModule.forRoot(
      mongoDbURI,
    ),
    UserModule,
    GalleryModule,
    UploadModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
