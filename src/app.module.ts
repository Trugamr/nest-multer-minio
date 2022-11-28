import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfigOptions } from './config/config.options';
import { FilesModule } from './files/files.module';

@Module({
  imports: [ConfigModule.forRoot(getConfigOptions()), FilesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
