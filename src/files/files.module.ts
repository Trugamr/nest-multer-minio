import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { getMulterConfig } from 'src/config/multer.options';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { EnvionmentVariables } from 'src/config/config.options';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<EnvionmentVariables>) => {
        return getMulterConfig(configService);
      },
      inject: [ConfigService<EnvionmentVariables>],
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
