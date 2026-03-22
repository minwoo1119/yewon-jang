import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import {
  defaultPortfolioContent,
  type PortfolioContent,
} from './portfolio.types';

const SINGLETON_ID = 'singleton';

type PortfolioRow = {
  id: string;
  content: PortfolioContent;
  updated_at: string;
};

@Injectable()
export class PortfolioService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getPortfolio() {
    const client = this.supabaseService.getClient();
    const table = this.supabaseService.getPortfolioTable();

    const response = (await client
      .from(table)
      .select('id, content, updated_at')
      .eq('id', SINGLETON_ID)
      .maybeSingle()) as {
      data: PortfolioRow | null;
      error: { message: string } | null;
    };

    const { data, error } = response;

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (!data) {
      return this.savePortfolio(defaultPortfolioContent);
    }

    return {
      id: data.id,
      content: data.content,
      updatedAt: data.updated_at,
    };
  }

  async savePortfolio(content: PortfolioContent) {
    const client = this.supabaseService.getClient();
    const table = this.supabaseService.getPortfolioTable();

    const response = (await client
      .from(table)
      .upsert(
        {
          id: SINGLETON_ID,
          content,
        },
        {
          onConflict: 'id',
        },
      )
      .select('id, content, updated_at')
      .single()) as {
      data: PortfolioRow;
      error: { message: string } | null;
    };

    const { data, error } = response;

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return {
      id: data.id,
      content: data.content,
      updatedAt: data.updated_at,
    };
  }
}
