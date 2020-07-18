import { Field, InputType } from 'type-graphql';

@InputType()
export class FindVenueInput {
    @Field({ nullable: true })
    id?: string

    @Field({ nullable: true })
    name?: string

    @Field({ nullable: true })
    city?: string
}