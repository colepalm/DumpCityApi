import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateAttendeeInput {
    @Field()
    user: string

    @Field()
    show: string
}
