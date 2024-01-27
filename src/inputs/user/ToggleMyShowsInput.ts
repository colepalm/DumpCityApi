import { InputType, Field } from 'type-graphql';

@InputType()
export class ToggleMyShowsInput {
    @Field()
    userId: string;

    @Field()
    date: Date;

    @Field()
    didAttend: Boolean
}
