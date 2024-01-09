import { InputType, Field } from 'type-graphql';

@InputType()
export class ToggleMyShowsInput {
    @Field()
    userId: number;

    @Field()
    date: Date;

    @Field()
    didAttend: Boolean
}
