import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Gallery extends Document {
  @Prop()
  category: string;

  @Prop()
  image_url: string;

  @Prop()
  title: string;

  @Prop()
  date: Date;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);