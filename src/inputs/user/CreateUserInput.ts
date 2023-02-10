import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserInput {
    @Field({ nullable: false })
    username: string;

    @Field()
    email: string;
}
