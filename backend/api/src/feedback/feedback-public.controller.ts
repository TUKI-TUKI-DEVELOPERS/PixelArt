import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackPublicController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get('ratings')
  getPublicRatings() {
    return this.feedbackService.getPublicRatings();
  }

  @Get(':token')
  getInfo(@Param('token') token: string) {
    return this.feedbackService.getFeedbackInfo(token);
  }

  @Post(':token')
  submit(
    @Param('token') token: string,
    @Body() body: { ratingX2: number; comment?: string },
  ) {
    return this.feedbackService.submitFeedback(token, body.ratingX2, body.comment);
  }
}
