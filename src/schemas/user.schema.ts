import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Gallery } from './gallery.schema';

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop([Gallery])
  gallery: Gallery[];
}

export const UserSchema = SchemaFactory.createForClass(User);