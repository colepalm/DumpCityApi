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
        );
        if (!show) throw new Error("Show not found!");

        let myShows = await user.myShows;

        if (data.didAttend) {
            // Check if the show is already in myShows
            if (!myShows.some(s => s.id === show.id)) {
                myShows.push(show);
                console.log(`Added show to user's myShows: User ${user.id}, Show ${show.date}`);
            } else {
                console.log(`Show already in user's myShows: User ${user.id}, Show ${show.date}`);
            }
        } else {
            // Remove the show if it exists in myShows
            const index = myShows.findIndex(s => s.id === show.id);
            if (index !== -1) {
                myShows.splice(index, 1);
                console.log(`Removed show from user's myShows: User ${user.id}, Show ${show.date}`);
            } else {
                console.log(`Show not found in user's myShows: User ${user.id}, Show ${show.date}`);
            }
        }

        // Save the updated user
        await this.userRepository.save(user);
        console.log(`User's myShows updated: User ${user.id}, Show ${show.date}, Attendance: ${data.didAttend}`);
        return user;
    }
}
