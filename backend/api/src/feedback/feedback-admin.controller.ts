import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AdminThrottleExempt } from '../common/decorators/throttle.decorators';

@Controller('admin/feedback')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'OPERATOR')
@AdminThrottleExempt()
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
