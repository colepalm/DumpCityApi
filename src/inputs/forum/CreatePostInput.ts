import { Field, InputType } from 'type-graphql';

@InputType()
export class CreatePostInput {
    @Field({ nullable: false })
    user: string;

    @Field({ nullable: false })
    thread: string;

    @Field({ nullable: false })
    body: string;
}
