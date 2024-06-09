import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignupDto } from './dto/users-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserLoginDto } from './dto/users-login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() body: UserSignupDto): Promise<{ user: UserEntity }> {
    // console.log(body)
    return { user: await this.usersService.signup(body) };
  }

  @Post('login')
  async login(@Body() body: UserLoginDto): Promise<{
    accessToken: string;
    user: UserEntity;
  }> {
    // console.log(body)
    const user = await this.usersService.login(body);
    const accessToken = await this.usersService.assignToken(user);

    return { accessToken, user };
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
