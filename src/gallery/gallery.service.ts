import { Injectable, NotFoundException } from '@nestjs/common';
import { LocalService } from 'src/upload/local.service';
import { UserRepository } from 'src/user/user.repository';
import { GalleryDataDTO } from './dtos/gallery-data.dto';
import { GalleryRepository } from './gallery.repository';

@Injectable()
export class GalleryService {
  constructor (
    private userRepository: UserRepository,
    private galleryRepository: GalleryRepository,
    private localService: LocalService,
  ) { }

  async findGallery(userId: string, categories = []) {
    const user = await this.userRepository.findUser(userId);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    if (categories.length > 0) {
      return this.galleryRepository.findGalleryByCategory(userId, categories);
    }

    return this.galleryRepository.findGallery(userId);
  }

  async insertNewPhoto(galleryDataDTO: GalleryDataDTO, file: Express.Multer.File, userId: string) {
    const user = await this.userRepository.findUser(userId);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    
    const fileName = await this.localService.uploadFile(file, userId);

    const photo = await this.galleryRepository.insertNewPhoto(fileName, galleryDataDTO, user);

    return photo;
  }
}
