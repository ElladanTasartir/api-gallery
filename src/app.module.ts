import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoDbURI } from './config';

@Module({
  imports: [
    MongooseModule.forRoot(
      mongoDbURI,
    ),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
