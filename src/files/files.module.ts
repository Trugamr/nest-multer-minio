import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { getMulterConfig } from 'src/config/multer.options';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { EnvironmentVariables } from 'src/config/config.options';
import { FilesClientProvider } from './files.provider';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => {
        return getMulterConfig(configService);
      },
      inject: [ConfigService<EnvironmentVariables>],
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService, FilesClientProvider],
})
export class FilesModule {}
