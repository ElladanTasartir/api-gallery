import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Gallery } from "../schemas/gallery.schema";
import { User } from "../schemas/user.schema";
import { GalleryDataDTO } from "./dtos/gallery-data.dto";

export class GalleryRepository {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
    @InjectModel('Gallery')
    private galleryModel: Model<Gallery>,
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

  async findGalleryByCategory(categories: string[], userId: string): Promise<Gallery[]> {
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

  async insertNewPhoto(fileName: string, galleryDataDTO: GalleryDataDTO, user: User): Promise<Gallery> {
    const photoData = {
      ...galleryDataDTO,
      image_url: fileName,
      date: new Date(),
    };

    const gallery = new this.galleryModel(photoData);

    user.gallery.push(
      gallery
    );

    await user.save();

    return gallery;
  }
}