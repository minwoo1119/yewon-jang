import {
  Body,
  Controller,
  Post,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';

type LoginDto = {
  password: string;
};

@Controller('admin/auth')
export class AdminAuthController {
  @Post('login')
  login(@Body() body: LoginDto) {
    const adminPassword = process.env.PORTFOLIO_ADMIN_PASSWORD;

    if (!adminPassword) {
      throw new ServiceUnavailableException(
        'Admin password is not configured on the server.',
      );
    }

    if (body.password !== adminPassword) {
      throw new UnauthorizedException('Invalid password.');
    }

    return {
      authenticated: true,
    };
  }
}
