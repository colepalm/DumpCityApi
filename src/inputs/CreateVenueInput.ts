import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateVenueInput {
    @Field()
    name: string;

    @Field()
    city: string;

    @Field()
    state: string;

    @Field()
    country: string;
}