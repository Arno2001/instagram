import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

export class StorageProvider {
  static UPLOADS_PATH = './uploads';
  static AVATARS_DIR_PATH = `${this.UPLOADS_PATH}/avatars`;
  static POST_IMAGE_DIR_PATH = `${this.UPLOADS_PATH}/posts-image`;

  static uploadFileOptions = (imagePath: string) => ({
    storage: diskStorage({
      destination: imagePath,
      filename: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
          cb(
            new HttpException('Invalid Image', HttpStatus.BAD_REQUEST),
            file.filename,
          );
        }
        const filename: string =
          path.parse(file.originalname).name.replace(/\s/g, '') + uuid();
        const extension: string = path.parse(file.originalname).ext;
        cb(null, `${filename}${extension}`);
      },
    }),
  });

  static avatarUploadFileOptions = this.uploadFileOptions(
    this.AVATARS_DIR_PATH,
  );

  static postImageUploadFileOptions = this.uploadFileOptions(
    this.POST_IMAGE_DIR_PATH,
  );
}
