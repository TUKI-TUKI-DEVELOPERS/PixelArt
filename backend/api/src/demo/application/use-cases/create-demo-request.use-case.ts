import { Injectable, BadRequestException } from '@nestjs/common';
import { DemoRepositoryPort, CreateDemoRequestData } from '../../domain/ports/demo-repository.port';
import { DemoRequest } from '../../domain/demo-request';

@Injectable()
export class CreateDemoRequestUseCase {
  constructor(private readonly repo: DemoRepositoryPort) {}

  async execute(data: CreateDemoRequestData): Promise<DemoRequest> {
    if (!data.templateIds || data.templateIds.length === 0) {
      throw new BadRequestException('Debe seleccionar al menos 1 plantilla');
    }
    if (data.templateIds.length > 3) {
      throw new BadRequestException('Máximo 3 plantillas permitidas');
    }
    if (data.assetIds && data.assetIds.length > 5) {
      throw new BadRequestException('Máximo 5 fotos permitidas');
    }
    return this.repo.create(data);
  }
}
