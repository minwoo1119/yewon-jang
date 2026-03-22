import {
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private adminClient: SupabaseClient | null = null;

  getClient(): SupabaseClient {
    if (this.adminClient) {
      return this.adminClient;
    }

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      throw new ServiceUnavailableException(
        'Supabase environment variables are not configured.',
      );
    }

    this.adminClient = createClient(url, key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    return this.adminClient;
  }

  getPortfolioTable(): string {
    return process.env.SUPABASE_PORTFOLIO_TABLE ?? 'portfolio_content';
  }

  getStorageBucket(): string {
    return process.env.SUPABASE_STORAGE_BUCKET ?? 'portfolio-images';
  }

  async uploadImage(file: Express.Multer.File, folder = 'portfolio') {
    const client = this.getClient();
    const bucket = this.getStorageBucket();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '-');
    const path = `${folder}/${Date.now()}-${safeName}`;

    const { error } = await client.storage
      .from(bucket)
      .upload(path, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    const { data } = client.storage.from(bucket).getPublicUrl(path);

    return {
      bucket,
      path,
      publicUrl: data.publicUrl,
    };
  }
}
