import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
