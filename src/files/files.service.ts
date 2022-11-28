import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as Minio from 'minio';
import { EnvironmentVariables } from 'src/config/config.options';
import { FilesClientProvide } from './files.provider';

@Injectable()
export class FilesService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    @Inject(FilesClientProvide) private readonly client: Minio.Client,
  ) {}

  put(file: Express.MulterS3.File) {
    return {
      bucket: file.bucket,
      key: file.key,
      size: file.size,
      mimetype: file.mimetype,
    };
  }

  async get(bucket: string, name: string, res: Response) {
    const object = await this.client.statObject(bucket, name);

    res.setHeader('Content-Type', object.metaData['content-type']);
    res.setHeader(
      'Content-Disposition',
      object.metaData['content-disposition'],
    );

    const stream = await this.client.getObject(bucket, name);
    stream.pipe(res);
  }
}
