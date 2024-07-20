import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  /*********************************getToken********************************************/
  async getTokens(user: User) {
    try {
      const payload = {
        id: user.id,
        phone: user.phone,
        role: user.role,
      };

      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(payload, {
          secret: process.env.ACCESS_TOKEN_KEY,
          expiresIn: process.env.ACCESS_TOKEN_TIME,
        }),
        this.jwtService.signAsync(payload, {
          secret: process.env.REFRESH_TOKEN_KEY,
          expiresIn: process.env.REFRESH_TOKEN_TIME,
        }),
      ]);
      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error) {
      console.log(error);
    }
  }

  /*************************************updateRefreshToken*****************************************************/
  async updateRefreshToken(user: User, refreshToken: string) {
    try {
      const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
      await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          hashed_refresh_token: hashedRefreshToken,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  /****************************************signUp**********************************************/
  async signUp(createUserDto: CreateUserDto, res: Response) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          phone: createUserDto.phone,
        },
      });
      if (user) {
        throw new BadRequestException("User already exists !");
      }
      if (createUserDto.password != createUserDto.confirm_password) {
        throw new BadRequestException("Password not match!");
      }
      const hashed_password = await bcrypt.hash(createUserDto.password, 7);
      const newUser = await this.prismaService.user.create({
        data: {
          phone: createUserDto.phone,
          hashed_password: hashed_password,
          name: createUserDto.name,
        },
      });

      const tokens = await this.getTokens(newUser);
      await this.updateRefreshToken(newUser, tokens.refresh_token);
      res.cookie("refresh_token", tokens.refresh_token, {
        maxAge: Number(process.env.COOKIE_TIME),
        httpOnly: true,
      });
      return tokens;
    } catch (error) {
      console.log(error);
      
    }
  }

  /************************************************signIn********************************************************* */

  async signIn(loginUserDto: LoginUserDto, res: Response) {
    try {
      const { password, phone } = loginUserDto;
      const newUser = await this.prismaService.user.findUnique({
        where: { phone },
      });
      if (!newUser) {
        throw new BadRequestException("User not found");
      }
      const passwordIsMatch = await bcrypt.compare(
        password,
        newUser.hashed_password
      );

      if (!passwordIsMatch) {
        throw new BadRequestException("Password do not match");
      }

      const tokens = await this.getTokens(newUser);

      const updateUser = await this.updateRefreshToken(
        newUser,
        tokens.refresh_token
      );

      res.cookie("refresh_token", tokens.refresh_token, {
        maxAge: Number(process.env.COOKIE_TIME),
        httpOnly: true,
      });

      return tokens;
    } catch (error) {
      console.log("error", error);
    }
  }
  /***************************************************logout******************************************************* */

  async signOut(refreshToken: string, res: Response) {
    try {
      const userData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      if (!userData) {
        throw new ForbiddenException("Refresh token is invalid");
      }
      const updateUser = await this.prismaService.user.update({
        where: {
          id: userData.id,
        },
        data: {
          hashed_refresh_token: "",
        },
      });
      res.clearCookie("refresh_token");
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  /****************************************refreshToken*********************************************** */

  async refreshToken(refreshToken: string, res: Response) {
    try {
      const decodedToken = await this.jwtService.decode(refreshToken);
      const newUser = await this.prismaService.user.findUnique({
        where: { id: decodedToken["id"] },
      });
      if (!newUser) {
        throw new BadRequestException("Refresh token is invalid");
      }

      if (!newUser || !newUser.hashed_refresh_token) {
        throw new BadRequestException("user does not exist");
      }
      const tokenMatch = await bcrypt.compare(
        refreshToken,
        newUser.hashed_refresh_token
      );

      if (!tokenMatch) {
        throw new ForbiddenException("Forbidden");
      }

      const tokens = await this.getTokens(newUser);
      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
      await this.prismaService.user.update({
        where: { id: newUser.id },
        data: {
          hashed_refresh_token,
        },
      });
      res.cookie("refresh_token", tokens.refresh_token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return tokens;
    } catch (error) {
      console.log(error);
    }
  }

  /******************************************updateUser******************************** */

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
            const user = await this.prismaService.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new BadRequestException("User not found");
      }

      if (updateUserDto.hashed_password) {
        const matchPassword = await bcrypt.compare(
          updateUserDto.hashed_password,
          user.hashed_password
        );

        if (!matchPassword) {
          throw new BadRequestException("Password not match");
        }

        updateUserDto.hashed_password = await bcrypt.hash(
          updateUserDto.hashed_password,
          7
        );
      }

      const updatedUser = await this.prismaService.user.update({
        where: { id },
        data: {
          ...updateUserDto,
        },
      });

      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new BadRequestException("Failed to update user");
    }
  }

  /*****************************findAll********************************************************/
  async findAll() {
    try {
      return await this.prismaService.user.findMany();
    } catch (error) {
      throw new Error(`Error finding users: ${error.message}`);
    }
  }
  /********************************************************FinOne*********************************** */
  async findOne(id: number) {
    try {
      return await this.prismaService.user.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error(`Error finding user with ID ${id}: ${error.message}`);
    }
  }

  /************************************************Delete************************************ */
  async remove(id: number) {
    try {
      return await this.prismaService.user.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error(`Error deleting user with ID ${id}: ${error.message}`);
    }
  }
}
