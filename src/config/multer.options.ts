import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ConfigService } from '@nestjs/config';

export function getMulterConfig(configService: ConfigService): MulterOptions {
  return {};
}
