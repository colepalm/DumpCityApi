import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateThreadInput {
    @Field({ nullable: false })
    user: string;

    @Field({ nullable: false })
    body: string;

    @Field({ nullable: false })
    title: string;
}
