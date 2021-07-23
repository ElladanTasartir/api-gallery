import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gallery } from "../../gallery/schemas/gallery.schema";

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