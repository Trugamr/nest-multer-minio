import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import type { EnvironmentVariables } from '../config/config.options';

export const FilesClientProvide = 'FilesClientProvide';

export const FilesClientProvider: Provider<Promise<Minio.Client>> = {
  provide: FilesClientProvide,
  useFactory: async (configService: ConfigService<EnvironmentVariables>) => {
    return new Minio.Client({
      endPoint: configService.get('S3_HOST'),
      port: configService.get('S3_PORT'),
      accessKey: configService.get('S3_ACCESS_KEY'),
      secretKey: configService.get('S3_SECRET_KEY'),
      region: configService.get('S3_REGION'),
      useSSL: false,
    });
  },
  inject: [ConfigService<EnvironmentVariables>],
};
