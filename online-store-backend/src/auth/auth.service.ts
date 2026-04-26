import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcrypt";
import { instanceToPlain } from "class-transformer";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user: User = await this.validateUser(userDto);

    const payload = { email: user.email, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      user: instanceToPlain(user),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const { email, password } = userDto;

    const user: User | null = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException("User is not exist");
    }

    const passwordEquals = await bcrypt.compare(password, user.password);

    if (!passwordEquals) {
      throw new UnauthorizedException("Wrong password");
    }

    return user;
  }
}
