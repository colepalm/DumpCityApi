import { Query, Resolver } from "type-graphql";

import { Venue } from "../models/Venue";

@Resolver()
export class VenueResolver {
    @Query(() => Venue)
    venue() {
        return Venue.find()
    }
}