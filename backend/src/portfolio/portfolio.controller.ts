import { Body, Controller, Get, Put } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { type PortfolioContent } from './portfolio.types';

type UpdatePortfolioDto = {
  content: PortfolioContent;
};

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  getPortfolio() {
    return this.portfolioService.getPortfolio();
  }

  @Put()
  updatePortfolio(@Body() body: UpdatePortfolioDto) {
    return this.portfolioService.savePortfolio(body.content);
  }
}
