import { BadRequestException, Body, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GalleryDataDTO } from './dtos/gallery-data.dto';
import { GalleryService, User } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(
    private galleryService: GalleryService,
  ) { }

  @Get()
  async findGalleryByUser(
    @Query('category')
    category,
  ): Promise<User> {
    if (!category) {
      throw new BadRequestException('You must inform a category');
    }

    return this.galleryService.findGalleryByUser(category);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image'))
  async insertNewPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body() galleryDataDTO: GalleryDataDTO,
  ) {

  }
}