import { Controller, Get, Param } from '@nestjs/common';
import { PersonalizedService } from './personalized.service';

@Controller('personalized')
export class PersonalizedController {
  constructor(private readonly personalizedService: PersonalizedService) {}

  @Get('categories')
  listCategories() {
    return this.personalizedService.listCategories();
  }

  @Get('categories/:id/models')
  listModelsByCategory(@Param('id') id: string) {
    return this.personalizedService.listModelsByCategory(id);
  }

  @Get('models/:id/templates')
  listTemplatesByModel(@Param('id') id: string) {
    return this.personalizedService.listTemplatesByModel(id);
  }
}
