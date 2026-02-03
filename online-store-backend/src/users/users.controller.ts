import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(new ValidationPipe())
  @Post('/create')
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }
}
