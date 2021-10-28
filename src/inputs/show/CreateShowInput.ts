import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateShowInput {
    @Field()
    date: Date

    @Field()
    venue: string
}
