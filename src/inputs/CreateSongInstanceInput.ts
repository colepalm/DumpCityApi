import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateSongInstanceInput {
    @Field()
    setNumber: number

    @Field()
    position: number

    @Field()
    show: string

    @Field({ nullable: true })
    description?: string

    @Field({ nullable: true })
    jamChart?: boolean
}