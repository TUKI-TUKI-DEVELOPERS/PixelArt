import { Controller, Get, Post, Param } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('admin/feedback')
export class FeedbackAdminController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  listAll() {
    return this.feedbackService.listAll();
  }

  @Post('generate/:orderId')
  generateLink(@Param('orderId') orderId: string) {
    return this.feedbackService.generateFeedbackLink(Number(orderId));
  }
}
