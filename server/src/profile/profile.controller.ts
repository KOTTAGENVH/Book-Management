import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(@Req() req: Request) {
    const { email, firstName, lastName } = req;
    return this.profileService.getProfile({ email, firstName, lastName });
  }
}
