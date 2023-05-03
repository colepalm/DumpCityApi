import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateSongInstanceInput {
    @Field()
    song: string;

    @Field()
    position: number

    @Field()
    set: string

    @Field({ nullable: true })
    description?: string

    @Field({ nullable: true })
    jamChart?: boolean

    @Field({ nullable: true })
    segueType?: string;
}