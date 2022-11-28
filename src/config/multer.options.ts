import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';
import * as contentDisposition from 'content-disposition';
import { EnvionmentVariables } from './config.options';

export function getMulterConfig(
  configService: ConfigService<EnvionmentVariables>,
): MulterOptions {
  const s3 = new S3Client({
    endpoint: configService.get('S3_ENDPOINT'),
    credentials: {
      accessKeyId: configService.get('S3_ACCESS_KEY'),
      secretAccessKey: configService.get('S3_SECRET_KEY'),
    },
    forcePathStyle: true,
    region: 'local',
  });

  const storage = multerS3({
    s3,
    bucket: configService.get('S3_BUCKET'),
    contentType: multerS3.AUTO_CONTENT_TYPE,
    contentDisposition: (req, file, cb) => {
      cb(null, contentDisposition(file.originalname, { type: 'inline' }));
    },
    metadata: (req, file, cb) => {
      cb(null, { filename: file.originalname });
    },
  });

  return {
    storage,
  };
}
