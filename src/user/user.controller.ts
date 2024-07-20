import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  Patch,
  Param,
  Get,
  Delete,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { Response } from "express";

import { LoginUserDto } from "./dto/login-user.dto";
import { CookieGetter } from "../common/decorators";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./user.service";
import { AdminGuard } from "../common/guards/admin.guard";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("signUp")
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({
    status: 201,
    description: "The user has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.signUp(createUserDto, res);
  }

  @Post("signIn")
  @ApiOperation({ summary: "User login" })
  @ApiResponse({ status: 200, description: "User logged in successfully." })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async signIn(
    @Body() createUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.signIn(createUserDto, res);
  }

  @HttpCode(200)
  @Post("signOut")
  async signOutt(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.signOut(refreshToken, res);
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Refresh access token" })
  @ApiResponse({ status: 200, description: "Token refreshed successfully." })
  async refreshToken(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.refreshToken(refreshToken, res);
  }

  @HttpCode(200)
  @UseGuards(AdminGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Update User" })
  @ApiResponse({ status: 200, description: "Update User successfully." })
  @ApiResponse({ status: 400, description: "Bad Request." })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @ApiOperation({ summary: "Get all users" })
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Get a user by ID" })
  @ApiParam({ name: "id", type: "number" })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: "Delete a user by ID" })
  @ApiParam({ name: "id", type: "number" })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
