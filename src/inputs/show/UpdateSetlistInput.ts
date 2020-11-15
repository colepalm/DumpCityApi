import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateSetlistInput {
    @Field()
    id: string;

    @Field(_ => [String])
    setlist: string[];
}