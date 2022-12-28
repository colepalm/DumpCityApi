import { Arg, Mutation, Resolver } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';

import { User } from '../../models/user/User';
import { CreateUserInput } from '../../inputs/user/CreateUserInput';

@Resolver()
export class UserResolver {
    constructor(
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
}
