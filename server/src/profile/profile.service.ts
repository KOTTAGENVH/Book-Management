import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
  getProfile(user: { email?: string; firstName?: string; lastName?: string }) {
    if (!user.email) {
      throw new Error('User not authenticated');
    }
    return {
      email: user.email ?? 'N/A',
      firstName: user.firstName ?? 'N/A',
      lastName: user.lastName ?? 'N/A',
      message: 'Profile retrieved successfully',
    };
  }
}
