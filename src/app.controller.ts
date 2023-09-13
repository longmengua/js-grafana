import { Controller, Get, Post, Res } from '@nestjs/common';
import { version } from "../package.json";
import { MetricsService } from './metrics/metrics.service';
import { register } from 'prom-client';
import { Response } from 'express';
@Controller()
export class AppController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  health() {
    return {
      status: 'ok',
      version: version
    }
  }

  @Post('metrics')
  async updateMetrics() {
    const bool = this.metricsService.setCryptoPriceStatus()
    return {
      status: bool ? 'ok' : 'failed'
    }
  }

  @Get('metrics')
  async getMetrics(@Res() res: Response) {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  }
}
