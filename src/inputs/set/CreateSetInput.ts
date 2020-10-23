import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateSetInput {
    @Field(
        _ => [String],
        { nullable: true }
        )
    songsPlayed?: string[];

    @Field()
    show: string;

    @Field()
    setNumber: number
}