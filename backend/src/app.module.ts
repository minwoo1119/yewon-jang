import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { HealthModule } from './health/health.module';
import { PortfolioModule } from './portfolio/portfolio.module';

@Module({
  imports: [HealthModule, PortfolioModule, AdminModule],
})
export class AppModule {}
