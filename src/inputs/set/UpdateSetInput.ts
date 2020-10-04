import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateSetInput{
    @Field(
        _ => [String],
        { nullable: false }
    )
    songsPlayed: string[];
}