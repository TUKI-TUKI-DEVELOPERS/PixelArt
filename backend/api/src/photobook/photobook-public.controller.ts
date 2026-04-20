import { Controller, Get, Post, Body } from '@nestjs/common';
import { PhotobookService } from './photobook.service';
import { CreateProjectData } from './domain/ports/photobook-repository.port';

@Controller('photobook')
export class PhotobookPublicController {
  constructor(private readonly service: PhotobookService) {}

  @Get('themes')
  listThemes() { return this.service.listThemes(); }

  @Get('products')
  listProducts() { return this.service.listProducts(); }

  @Post('projects')
  createProject(@Body() body: CreateProjectData) {
    return this.service.createProject(body);
  }
}
