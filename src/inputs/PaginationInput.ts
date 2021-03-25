import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class PaginationInput {
    @Field(() => Int)
    take: number;

    @Field(() => Int)
    skip: number;
}
