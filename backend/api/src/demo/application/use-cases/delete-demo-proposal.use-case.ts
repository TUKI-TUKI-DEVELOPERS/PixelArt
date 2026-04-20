import { Injectable, BadRequestException } from '@nestjs/common';
import { DemoRepositoryPort } from '../../domain/ports/demo-repository.port';
import { FileStoragePort } from '../../../assets/domain/ports/file-storage.port';

@Injectable()
export class DeleteDemoProposalUseCase {
  constructor(
    private readonly demoRepo: DemoRepositoryPort,
    private readonly fileStorage: FileStoragePort,
  ) {}

  async execute(demoRequestId: number, proposalId: number): Promise<void> {
    const detail = await this.demoRepo.findById(demoRequestId);
    if (!detail) throw new BadRequestException('Demo request no encontrada');
    if (detail.status !== 'RECEIVED') {
      throw new BadRequestException('No se puede eliminar propuestas de una solicitud ya procesada');
    }

    const storageKey = await this.demoRepo.deleteProposal(proposalId, demoRequestId);
    await this.fileStorage.delete(storageKey);
  }
}
