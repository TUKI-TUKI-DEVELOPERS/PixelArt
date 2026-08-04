import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DemoRepositoryPort } from '../../domain/ports/demo-repository.port';

@Injectable()
export class DeleteDemoRequestUseCase {
  constructor(private readonly demoRepo: DemoRepositoryPort) {}

  async execute(demoRequestId: number): Promise<void> {
    const request = await this.demoRepo.findById(demoRequestId);
    if (!request) throw new NotFoundException('Solicitud de demo no encontrada');

    const hasOrder = await this.demoRepo.hasOrder(demoRequestId);
    if (hasOrder) {
      throw new BadRequestException(
        'No se puede borrar — esta solicitud ya generó una orden.',
      );
    }

    await this.demoRepo.deleteRequest(demoRequestId);
  }
}
