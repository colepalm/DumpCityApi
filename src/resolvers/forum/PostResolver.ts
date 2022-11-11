import { Arg, Mutation, Resolver } from 'type-graphql';

import { Post } from '../../models/forum';
import { User } from '../../models/user/User';
import { CreatePostInput } from '../../inputs/forum/CreatePostInput';

@Resolver()
export class PostResolver {
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
}
