import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignupDto } from './dto/users-signup.dto';
import {hash} from "bcrypt"


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(body: UserSignupDto): Promise<UserEntity> {
    const userExists = await this.findOneByEmail(body.email)
    if (userExists) throw new BadRequestException("Email is not available")
    body.password = await hash(body.password, 12)
    const user = this.usersRepository.create(body);
    const newUser = await this.usersRepository.save(user);
    delete newUser.password
    return newUser;
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

  async findOneByEmail(email:string) {
    return await this.usersRepository.findOneBy({email})
  }
}
