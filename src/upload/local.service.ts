import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { resolve } from 'path';

@Injectable()
export class LocalService {
  async uploadFile(file: Express.Multer.File, id: string) {
    const [, fileExtension] = file.originalname.split('.');

    const fileName = `${id}-${Date.now()}-${randomBytes(12).toString('hex')}.${fileExtension}`;

    const filePath = resolve(__dirname, '..', '..', 'tmp', 'images', fileName);

    await fs.promises.writeFile(filePath, file.buffer, {
      encoding: 'utf-8',
    });

    return `http://localhost:3000/${fileName}`;
  }
}
