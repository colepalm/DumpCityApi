import { ValidationError } from "sequelize";

export default {
  Query: {
    shows: async (parent, args, { models }) => await models.Show.findAll(),
  },

  Mutation: {
    createShow: async (parent, { date, venueName, city, state, country }, { models }) => {
      let venue = await models.Venue.findOne({
        where: { name: venueName }
      });

      if (!venue) {
        if (city && state) {
          venue = await models.Venue.create({name: venueName, city, state, country})
        } else {
          throw new ValidationError('Venue not found')
        }
      }

      return models.Show.create({date, venueId: venue.id});
    }
  }
}