import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';

import { User } from '../../models/user';
import { Show } from '../../models/show';
import { CreateUserInput, FindMyShowsInput } from '../../inputs/user';
import { ToggleMyShowsInput } from '../../inputs/user/ToggleMyShowsInput';

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

    @Mutation(() => User)
    async toggleMyShows(@Arg('data') data: ToggleMyShowsInput) {
        const user = await this.userRepository.findOne(data.userId);
        if (!user) throw new Error("User not found!");

        const show = await this.showRepository.findOne(
            { where: { date: data.date } }
        )
        if (!show) throw new Error("Show not found!")

        if (data.didAttend) {
            // Check if the show is already in myShows
            let myShows: Show[] = await user.myShows;
            if (myShows) {
                if (myShows.filter(show => show.date === data.date).length === 0) {
                    (await user.myShows).push(show)
                } else {
                    console.log(`User ${user.id} has already added show ${show.date} to myShows`)
                }
            } else user.myShows = [show]
        } else {
            const index = (await user.myShows).indexOf(show);
            (await user.myShows).splice(index, 1)
        }

        await this.userRepository.save(user);
        console.log(`Saved show toggle: user ${user.id}, show ${show.date}, toggle: ${data.didAttend}`)
        return user;
    }
}
