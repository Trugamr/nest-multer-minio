import { Controller, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Put()
  @UseInterceptors(FileInterceptor('file'))
  put(@UploadedFile('file') file: Express.MulterS3.File) {
    return this.filesService.put(file);
  }
}
