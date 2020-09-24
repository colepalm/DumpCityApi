import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateShowInput {
    @Field()
    date: string

    @Field()
    venue: string
}