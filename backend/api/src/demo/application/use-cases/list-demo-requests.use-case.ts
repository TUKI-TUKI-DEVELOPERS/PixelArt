import { Injectable } from '@nestjs/common';
import { DemoRepositoryPort } from '../../domain/ports/demo-repository.port';
import { DemoRequest } from '../../domain/demo-request';

@Injectable()
export class ListDemoRequestsUseCase {
  constructor(private readonly repo: DemoRepositoryPort) {}

  async execute(): Promise<DemoRequest[]> {
    return this.repo.findAll();
  }
}
