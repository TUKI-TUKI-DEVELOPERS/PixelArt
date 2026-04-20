import { Controller, Get, Param } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('books')
  findAllActive() {
    return this.catalogService.findAllActive();
  }

  @Get('books/:id')
  findById(@Param('id') id: string) {
    return this.catalogService.findById(id);
  }
}
