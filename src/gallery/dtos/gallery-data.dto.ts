import { IsNotEmpty, IsString } from "class-validator";

export class GalleryDataDTO {
  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  title: string;
}