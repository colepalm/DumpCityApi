import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';

import { User } from '../../models/user';
import { Show } from '../../models/show';
import { CreateUserInput, FindMyShowsInput } from '../../inputs/user';

@Resolver()
export class UserResolver {
    constructor(
        @InjectRepository(User) private readonly showRepository: Repository<Show>,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    @Mutation(() => User)
    async createUser(@Arg('user') userInput: CreateUserInput) {
         const user = this.userRepository.create({
             email: userInput.email,
             username: userInput.email
         });
         await user.save();
         return user;
    }

    @Query(() => [Show])
    async myShows(@Arg('data') data: FindMyShowsInput) {
        const user = await this.userRepository.findOne({
            where: { id: data.userId }
        })

        if (!user) throw new Error("User not found!")
        console.log(`Fetching shows associated with user: ${data.userId}`)
        return user.myShows
    }
}
