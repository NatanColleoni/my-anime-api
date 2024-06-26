import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) throw new NotFoundException();

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) throw new UnauthorizedException();

    const payload = { user_id: user._id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
