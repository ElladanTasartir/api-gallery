import { Injectable, NotFoundException } from '@nestjs/common';
import { LocalService } from '../upload/local.service';
import { GalleryDataDTO } from './dtos/gallery-data.dto';

export interface User {
  name: string;
  email: string;
  gallery: Gallery[];
}

interface Gallery {
  image_url: string;
  title: string;
  category: string;
}

@Injectable()
export class GalleryService {
  constructor(
    private localService: LocalService,
  ) { }

  findGalleryByUser(category: string): User {
    const foundUser = {} as User;

    if (!foundUser) {
      throw new NotFoundException(`Category "${category}" not found`);
    }

    return foundUser;
  }

  insertNewPhoto({
    category,
    title,
  }: GalleryDataDTO,
    file: Express.Multer.File,
    userId: string) {

  }
}
