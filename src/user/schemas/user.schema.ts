import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

class Gallery {
  @Prop()
  image_url: string;

  @Prop()
  title: string;

  @Prop()
  date: Date;
}

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