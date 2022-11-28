import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';
import * as contentDisposition from 'content-disposition';
import { EnvironmentVariables } from './config.options';
import { config } from 'process';

export function getMulterConfig(
  configService: ConfigService<EnvironmentVariables>,
): MulterOptions {
  const endpoint = `http://${configService.get('S3_HOST')}:${configService.get(
    'S3_PORT',
  )}/`;

  const s3 = new S3Client({
    endpoint,
    credentials: {
      accessKeyId: configService.get('S3_ACCESS_KEY'),
      secretAccessKey: configService.get('S3_SECRET_KEY'),
    },
    region: configService.get('S3_REGION'),
    forcePathStyle: true,
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
