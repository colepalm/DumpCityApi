import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateSongInput {
    @Field()
    id: string

    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    firstPlayed: string

    @Field({ nullable: true })
    lastPlayed: string
}