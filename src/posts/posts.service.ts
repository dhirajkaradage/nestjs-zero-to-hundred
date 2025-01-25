import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Post) private postService: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<CreatePostDto> {
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

  async findOne(id: number) {
    return await this.postService.findOne({
      where: { id: id },
      relations: ['user'],
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const address: Post = await this.postService.findOne({ where: { id: id } });
    if (!address) {
      throw new HttpException('No address found', 412);
    }

    address.title = updatePostDto.title;
    address.content = updatePostDto.content;
    return await this.postService.save(address);
  }

  async remove(id: number) {
    return await this.postService.delete(id);
  }
}
