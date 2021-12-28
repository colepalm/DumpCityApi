import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateSetInput{
    @Field()
    id: string;

    @Field(
        _ => [String],
        { nullable: true }
    )
    songsPlayed: string[];

    @Field({ nullable: true })
    show: string
}
