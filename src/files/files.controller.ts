import {
  Controller,
  Get,
  Param,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Put()
  @UseInterceptors(FileInterceptor('file'))
  put(@UploadedFile('file') file: Express.MulterS3.File) {
    return this.filesService.put(file);
  }

  @Get('/:bucket/:name')
  get(
    @Param('bucket') bucket: string,
    @Param('name') name: string,
    @Res() res: Response,
  ) {
    return this.filesService.get(bucket, name, res);
  }
}
