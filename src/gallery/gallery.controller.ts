import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetAuthenticatedUser } from 'src/user/decorators/auth.decorator';
import { GalleryDataDTO } from './dtos/gallery-data.dto';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(
    private galleryService: GalleryService,
  ) { }

  @Get()
  findGalleryByUser(
    @GetAuthenticatedUser() userId: string,
    @Query('category') category: string,
  ) {
    if (category) {
      const categoryList = category.split(',');
      
      return this.galleryService.findGallery(userId, categoryList);
    }

    return this.galleryService.findGallery(userId);
  }
  
  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image'))
  insertNewPhoto(
    @Body() galleryDataDTO: GalleryDataDTO,
    @UploadedFile() file: Express.Multer.File,
    @GetAuthenticatedUser() userId: string,
  ) {
    return this.galleryService.insertNewPhoto(galleryDataDTO, file, userId);
  }
}
