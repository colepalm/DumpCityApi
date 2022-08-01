import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';

import { Post, Thread } from '../../models/forum';
import { User } from '../../models/user/User';
import { CreateThreadInput } from '../../inputs/forum/CreateThreadInput';
import { PaginationInput } from '../../inputs';

@Resolver()
export class ThreadResolver {
    constructor(
        @InjectRepository(Thread) private readonly threadRepository: Repository<Thread>,
        @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    ) { }

    @Mutation(() => Thread)
    async createThread(@Arg('thread') threadInput: CreateThreadInput) {
        const user = await User.findOne({ where: { id: threadInput.user }})
        if (!user) throw new Error("User not found!");

        const thread = this.threadRepository.create({
            createdDate: new Date(),
            user: user,
            title: threadInput.title
        });

        await thread.save();

        const post = this.postRepository.create({
            createdDate: new Date(),
            user: user,
            thread: thread,
            body: threadInput.body
        });

        await post.save();

        return thread;
    }

    @Query(() => [Thread])
    async threads(
        @Arg("pagination", { nullable: true })
            pagination?: PaginationInput
    ) {
        return Thread.find({
            take: pagination?.take || 10,
            order: { createdDate: 'DESC' },
            skip: pagination?.skip || 0,
        })
    }
}
