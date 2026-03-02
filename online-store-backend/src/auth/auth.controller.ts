import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  login(@Body() useDto: CreateUserDto) {
    return this.authService.login(useDto);
  }

  @Get("/profile")
  @UseGuards(AuthGuard("jwt"))
  getProfile(@Request() req: Request & { user: CreateUserDto }) {
    return {
      user: req.user,
    };
  }
}
