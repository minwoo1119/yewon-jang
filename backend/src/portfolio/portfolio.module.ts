import { Module } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';

@Module({
  controllers: [PortfolioController],
  providers: [PortfolioService, SupabaseService],
  exports: [PortfolioService],
})
export class PortfolioModule {}
