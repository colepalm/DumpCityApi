import { Arg, Mutation, Resolver } from 'type-graphql';

import { Post, Thread } from '../../models/forum';
import { User } from '../../models/user/User';
import { CreatePostInput } from '../../inputs/forum/CreatePostInput';

@Resolver()
export class PostResolver {
    @Mutation(() => Post)
    async createPost(@Arg('post') postInput: CreatePostInput) {
        const thread = await Thread.findOne({ where: { id: postInput.thread }})
        if (!thread) throw new Error("Thread not found!");

        const user = await User.findOne({ where: { id: postInput.user }})
        if (!user) throw new Error("User not found!");

        const post = Post.create({
            createdDate: new Date(),
            user: user,
            thread: thread,
            body: postInput.body
        });
        
        await post.save();
        return post;
    }
}
