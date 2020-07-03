import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateSongInput {
    @Field()
    name: string;

    @Field({ nullable: true })
    firstPlayed: string
}