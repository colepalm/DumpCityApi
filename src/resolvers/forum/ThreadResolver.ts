import { Arg, Mutation, Resolver } from 'type-graphql';

import { Post, Thread } from '../../models/forum';
import { User } from '../../models/user/User';
import { CreateThreadInput } from '../../inputs/forum/CreateThreadInput';

@Resolver()
export class ThreadResolver {
    @Mutation(() => Thread)
    async createThread(@Arg('post') threadInput: CreateThreadInput) {
        const user = await User.findOne({ where: { id: threadInput.user }})
        if (!user) throw new Error("User not found!");

        const thread = Thread.create({
            createdDate: new Date(),
            user: user,
            title: threadInput.title
        });

        await thread.save();

        const post = Post.create({
            createdDate: new Date(),
            user: user,
            thread: thread,
            body: threadInput.body
        });

        await post.save();

        return thread;
    }
}
