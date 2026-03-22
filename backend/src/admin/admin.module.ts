import { Module } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { AdminAuthController } from './admin-auth.controller';
import { AdminUploadsController } from './admin-uploads.controller';

@Module({
  controllers: [AdminAuthController, AdminUploadsController],
  providers: [SupabaseService],
})
export class AdminModule {}
