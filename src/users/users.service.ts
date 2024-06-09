import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignupDto } from './dto/users-signup.dto';
import {hash, compare} from "bcrypt"
import { UserLoginDto } from './dto/users-login.dto';
import { sign } from 'jsonwebtoken';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(body: UserSignupDto): Promise<UserEntity> {
    const userExists = await this.findOneByEmail(body.email);
    if (userExists) throw new BadRequestException('Email is not available');
    body.password = await hash(body.password, 12);
    const user = this.usersRepository.create(body);
    const newUser = await this.usersRepository.save(user);
    delete newUser.password;
    return newUser;
  }

  async login(body: UserLoginDto): Promise<UserEntity> {
    const userExists = await this.usersRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: body.email })
      .getOne();

    if (!userExists)
      throw new BadRequestException('Email or password is incorrect');

    const matchedPassword = await compare(body.password, userExists.password);
    if (!matchedPassword)
      throw new BadRequestException('Email or password is incorrect');

    delete userExists.password;
    return userExists;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async assignToken(user: UserEntity): Promise<string> {
    return sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    });
  }
}
