import { Injectable } from '@nestjs/common';
import { CreateDemoRequestUseCase } from './application/use-cases/create-demo-request.use-case';
import { ListDemoRequestsUseCase } from './application/use-cases/list-demo-requests.use-case';
import { GetDemoRequestDetailUseCase } from './application/use-cases/get-demo-request-detail.use-case';
import { UploadDemoProposalUseCase, UploadProposalInput } from './application/use-cases/upload-demo-proposal.use-case';
import { SendDemoProposalsUseCase } from './application/use-cases/send-demo-proposals.use-case';
import { CreateOrderFromDemoUseCase } from './application/use-cases/create-order-from-demo.use-case';
import { SendUnifiedCheckoutUseCase } from './application/use-cases/send-unified-checkout.use-case';
import { DeleteDemoProposalUseCase } from './application/use-cases/delete-demo-proposal.use-case';
import { ReissueCheckoutLinkUseCase } from './application/use-cases/reissue-checkout-link.use-case';
import { CreateDemoRequestData } from './domain/ports/demo-repository.port';

@Injectable()
export class DemoService {
  constructor(
    private readonly createUseCase: CreateDemoRequestUseCase,
    private readonly listUseCase: ListDemoRequestsUseCase,
    private readonly detailUseCase: GetDemoRequestDetailUseCase,
    private readonly uploadProposalUseCase: UploadDemoProposalUseCase,
    private readonly sendProposalsUseCase: SendDemoProposalsUseCase,
    private readonly createOrderUseCase: CreateOrderFromDemoUseCase,
    private readonly sendUnifiedCheckoutUseCase: SendUnifiedCheckoutUseCase,
    private readonly deleteProposalUseCase: DeleteDemoProposalUseCase,
    private readonly reissueCheckoutLinkUseCase: ReissueCheckoutLinkUseCase,
  ) {}

  create(data: CreateDemoRequestData) { return this.createUseCase.execute(data); }
  listAll() { return this.listUseCase.execute(); }
  getDetail(id: number) { return this.detailUseCase.execute(id); }
  uploadProposal(input: UploadProposalInput) { return this.uploadProposalUseCase.execute(input); }
  sendProposals(id: number) { return this.sendProposalsUseCase.execute(id); }
  createOrder(demoRequestId: number) { return this.createOrderUseCase.execute(demoRequestId); }
  sendUnifiedCheckout(demoRequestId: number) { return this.sendUnifiedCheckoutUseCase.execute(demoRequestId); }
  deleteProposal(demoRequestId: number, proposalId: number) { return this.deleteProposalUseCase.execute(demoRequestId, proposalId); }
  reissueCheckoutLink(demoRequestId: number) { return this.reissueCheckoutLinkUseCase.execute(demoRequestId); }
}
