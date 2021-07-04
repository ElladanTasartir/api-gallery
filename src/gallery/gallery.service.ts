import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Gallery } from 'src/schemas/gallery.schema';
import { UserRepository } from 'src/user/user.repository';
import { User } from '../schemas/user.schema';
import { LocalService } from '../upload/local.service';
import { GalleryDataDTO } from './dtos/gallery-data.dto';
import { GalleryRepository } from './gallery.repository';

@Injectable()
export class GalleryService {
  constructor(
    private galleryRepository: GalleryRepository,
    private userRepository: UserRepository,
    private localService: LocalService,
  ) { }

  async findGallery(userId: string): Promise<Gallery[]> {
    return this.galleryRepository.findGallery(userId);
  }

  async findGalleryByCategory(category: string, userId: string): Promise<Gallery[]> {
    return this.galleryRepository.findGalleryByCategory(category, userId);
  }

  async insertNewPhoto(
    galleryDataDTO: GalleryDataDTO,
    file: Express.Multer.File,
    userId: string): Promise<Gallery> {
    const user = await this.userRepository.findUser(userId);

    if (!user) {
      throw new NotFoundException(`User "${userId}" does not exist`);
    }

    const fileName = await this.localService.uploadFile(file, userId);

    const photo = await this.galleryRepository.insertNewPhoto(fileName, galleryDataDTO, user);

    return photo;
  }
}
