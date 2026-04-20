import { Controller, Get } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller()
export class AppController {
  constructor(@InjectDataSource() private readonly db: DataSource) {}

  @Get('health')
  async health() {
    const dbOk = this.db.isInitialized;
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        api: 'up',
        database: dbOk ? 'up' : 'down',
      },
    };
  }
}
