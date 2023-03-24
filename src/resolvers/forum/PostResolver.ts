import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';

import { Post } from '../../models/forum';
import { User } from '../../models/user/User';
import { CreatePostInput } from '../../inputs/forum';
import { PaginationInput } from '../../inputs';
import { ToggleLikeInput } from '../../inputs/forum/ToggleLikeInput';

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
    async posts(
        @Arg("pagination", { nullable: true })
            pagination?: PaginationInput
    ) {
        return await Post.find({
            take: pagination?.take || 10,
            order: { createdDate: 'DESC' },
            skip: pagination?.skip || 0,
        });
    }

    @Query(() => [Post])
    async userPosts(@Arg('userId') userId: string) {
        const user = await this.userRepository.findOne(
            { where: { id: userId }}
        )
        if (!user) throw new Error("User not found!")

        return await this.postRepository.find(
            { where: { user }}
        );
    }

    @Mutation(() => Post)
    async toggleLike(@Arg('data') data: ToggleLikeInput) {
        const post = await this.postRepository.findOne(
            { where: { id: data.post } }
        )
        if (!post) throw new Error(`Post ${data.post} not found`)

        const user = await this.userRepository.findOne(
            { where: { id: data.user }}
        )
        if (!user) throw new Error(`User ${data.user} not found`)

        if (data.isLiked) {
            let likers: User[] = await post.likers
            if (likers) {
                if (likers.filter(user => user.id === user.id).length === 0) {
                    (await post.likers).push(user);
                } else {
                    console.log(`User ${user.id} already liked post ${post.id}`)
                }
            } else {
                post.likers = [user];
            }
        } else {
            const index = (await post.likers).indexOf(user);
            (await post.likers).splice(index, 1);
        }

        await post.save();
        console.log(`Saved like: user ${user.id}, post ${post.id}, toggle: ${data.isLiked}`)
        return post;
    }
}
