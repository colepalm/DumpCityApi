import { Field, InputType } from 'type-graphql';

@InputType()
export class FindSongInput {
    @Field({ nullable: true })
    id?: string;

    @Field({ nullable: true })
    name?: string
}