import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  put(file: Express.MulterS3.File) {
    return {
      bucket: file.bucket,
      key: file.key,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}
