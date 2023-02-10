import { Field, InputType } from 'type-graphql';

@InputType()
export class ToggleLikeInput {
    @Field({ nullable: false })
    post: string;

    @Field({ nullable: false })
    isLiked: boolean;
}
