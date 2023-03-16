import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserInput {
    @Field({ nullable: true })
    username: string;

    @Field()
    email: string;
}
