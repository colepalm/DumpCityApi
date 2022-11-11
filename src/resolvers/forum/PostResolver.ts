import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';

import { Post } from '../../models/forum';
import { User } from '../../models/user/User';
import { CreatePostInput } from '../../inputs/forum/CreatePostInput';

@Resolver()
export class PostResolver {
    constructor(
        @InjectRepository(Post) private readonly postRepository: Repository<Post>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    @Mutation(() => Post)
    async createPost(@Arg('post') postInput: CreatePostInput) {
        const user = await User.findOne({ where: { id: postInput.user }})
        if (!user) throw new Error("User not found!");

        const post = Post.create({
            createdDate: new Date(),
            user: user,
            body: postInput.body
        });

        await post.save();
        return post;
    }

    @Query(() => Post)
    async post(@Arg('id') id: string) {
        const posts = await this.postRepository.findOne(
            { where: { id }}
        )
        if (!posts) throw new Error("Posts not found!")
        return posts;
    }

    @Query(() => [Post])
    async posts() {
        const post = await this.postRepository.find()
        if (!post) throw new Error("Post not found!")
        return post;
    }

    @Query(() => [Post])
    async userPosts(@Arg('userId') userId: string) {
        const user = await this.userRepository.findOne(
            { where: { id: userId }}
        )
        if (!user) throw new Error("User not found!")

        return await this.postRepository.find(
            {where: { user }}
        );
    }
}
