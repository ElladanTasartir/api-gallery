import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User } from "src/user/schemas/user.schema";
import { GalleryDataDTO } from "./dtos/gallery-data.dto";
import { Gallery } from "./schemas/gallery.schema";

@Injectable()
export class GalleryRepository {
  constructor(
    @InjectModel('Gallery')
    private galleryModel: Model<Gallery>,
    @InjectModel('User')
    private userModel: Model<User>
  ) { }

  async findGallery(userId: string): Promise<Gallery[]> {
    const query = {
      _id: Types.ObjectId(userId),
    };

    const projection = {
      title: '$gallery.title',
      category: '$gallery.category',
      photo_id: '$gallery._id',
      image_url: '$gallery.image_url',
      date: '$gallery.date',
      _id: 0,
    };

    return this.userModel.aggregate<Gallery>([{
      $match: query,
    }, {
      $unwind: '$gallery'
    }, {
      $project: projection,
    }]);
  }

  async findGalleryByCategory(userId: string, categories: string[]) {
    const query = {
      _id: Types.ObjectId(userId),
      'gallery.category': {
        $in: categories,
      }
    };

    const projection = {
      _id: 0,
      title: '$gallery.title',
      category: '$gallery.category',
      photo_id: '$gallery._id',
      image_url: '$gallery.image_url',
      date: '$gallery.date',
    };

    return this.userModel.aggregate<Gallery>([{
      $match: query,
    }, {
      $unwind: '$gallery',
    }, {
      $project: projection,
    }, {
      $match: {
        category: {
          $in: categories
        }
      }
    }]);
  }

  async insertNewPhoto(
    fileName: string,
    galleryDataDTO: GalleryDataDTO,
    user: User,
  ) {
    const { category, title } = galleryDataDTO;
    const photoData = {
      category,
      title,
      image_url: fileName,
      date: new Date(),
    };

    const photo = new this.galleryModel(photoData);

    user.gallery.push(photo);

    await user.save();

    return photo;
  }
}