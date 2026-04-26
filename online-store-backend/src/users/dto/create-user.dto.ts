import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "user@gmail.ru",
    description: "Email",
  })
  @IsEmail(
    {},
    {
      message: "Wrong email",
    },
  )
  readonly email: string;

  @ApiProperty({
    example: "123456",
    description: "Password",
  })
  @IsString({
    message: "Must be string",
  })
  @MinLength(6, {
    message: "Min length must be more or equl 6",
  })
  @MaxLength(12, {
    message: "Max length must be less 12",
  })
  readonly password: string;

  @ApiProperty({
    example: "https://i.pravatar.cc/",
    description: "Avatar",
  })
  @IsOptional()
  @IsString({
    message: "Must be string",
  })
  readonly avatar: string;

  @ApiProperty({
    example: "Kirill",
    description: "Name",
  })
  @IsOptional()
  @IsString({
    message: "Must be string",
  })
  @MaxLength(12, {
    message: "Max length must be less 12",
  })
  readonly name: string;
}
