import { InputType, Field } from 'type-graphql';

@InputType()
export class ToggleMyShowsInput {
    @Field()
    userId: string;

    @Field()
    date: string;

    @Field()
    didAttend: Boolean
}
