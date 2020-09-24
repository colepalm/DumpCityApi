import { Field, InputType } from 'type-graphql';

@InputType()
export class FindShowInput {
    @Field({ nullable: true })
    id?: string

    @Field({ nullable: true })
    date?: string
}