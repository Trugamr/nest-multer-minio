import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { getMulterConfig } from 'src/config/multer.options';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return getMulterConfig(configService);
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
