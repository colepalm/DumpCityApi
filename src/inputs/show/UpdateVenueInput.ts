import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateVenueInput {
    @Field({ nullable: false })
    addOne: boolean

    @Field({ nullable: true })
    timesPlayed: number;
}