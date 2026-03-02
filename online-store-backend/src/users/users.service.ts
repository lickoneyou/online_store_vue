import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateUserDto) {
    const { email, password } = dto;

    const isUserExist = await this.getUserByEmail(email);

    if (isUserExist) {
      throw new HttpException(
        "User with this email already exists",
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({ email, password: hashPassword });

    const savedUser = await this.userRepository.save(user);
    const payload = { email: savedUser.email, id: savedUser.id };
    const access_token = this.jwtService.sign(payload);

    return {
      user: {
        id: savedUser.id,
        email: savedUser.email,
      },
      access_token,
    };
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  }
}
