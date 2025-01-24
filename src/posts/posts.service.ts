import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
// import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Post) private postService: Repository<Post>,
  ) {}
  async create(createPostDto: CreatePostDto): Promise<CreatePostDto> {
    console.log('this is createPostDto, ', createPostDto);
    const user = await this.userRepo.findOne({
      where: { id: createPostDto.userId },
    });
    console.log('this is user ', user);
    if (!user) {
      throw new HttpException('No user found', 412);
    }
    createPostDto['user'] = user;

    return await this.postService.save(createPostDto);
  }

  async findAll(): Promise<Post[]> {
    return await this.postService.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  // update(id: number, updatePostDto: UpdatePostDto) {
  //   return `This action updates a #${id} post`;
  // }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
