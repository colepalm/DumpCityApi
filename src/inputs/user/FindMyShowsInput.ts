import { Field, InputType } from 'type-graphql';

@InputType()
export class FindMyShowsInput {
    @Field({ nullable: false })
    userId: string;
}
