import { Body, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Gallery } from 'src/schemas/gallery.schema';
import { GetAuthenticatedUser } from 'src/user/decorators/auth.decorator';
import { GalleryDataDTO } from './dtos/gallery-data.dto';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(
    private galleryService: GalleryService,
  ) { }

  @Get()
  async findGalleryByUser(
    @Query('category') category: string,
    @GetAuthenticatedUser() userId: string,
  ): Promise<Gallery[]> {
    if (!category) {
      return this.galleryService.findGallery(userId);
    }

    const categoriesArray = category.split(',');

    return this.galleryService.findGalleryByCategory(categoriesArray, userId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image'))
  async insertNewPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body() galleryDataDTO: GalleryDataDTO,
    @GetAuthenticatedUser() userId: string,
  ) {
    return this.galleryService.insertNewPhoto(galleryDataDTO, file, userId);
  }
}