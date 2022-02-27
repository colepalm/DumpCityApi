import { Arg, Mutation, Resolver } from 'type-graphql';

import { User } from '../../models/user/User';
import { CreateUserInput } from '../../inputs/user/UserInput';

@Resolver()
export class UserResolver {
    @Mutation(() => User)
    async createUser(@Arg('user') userInput: CreateUserInput) {
         const user = User.create({ username: userInput.username });
         await user.save();
         return user;
    }
}
