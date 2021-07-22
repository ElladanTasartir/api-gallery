import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'User',
      schema: UserSchema,
      collection: 'users',
    }]),
  ],
  controllers: [
    UserController,
    AuthController,
  ],
  providers: [
    UserRepository,
    UserService,
    AuthService,
  ]
})
export class UserModule { }
