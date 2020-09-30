import { Field, InputType } from 'type-graphql';

import { SongInstance } from '../models';

@InputType()
export class CreateSetInput {
    @Field()
    songsPlayed?: string[];

    @Field()
    show: string;
}