import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CategoryEnum } from '../enums/category.enum';

export class GalleryDataDTO {
  @IsNotEmpty()
  @IsEnum(CategoryEnum)
  category: CategoryEnum;

  @IsNotEmpty()
  @IsString()
  title: string;
}