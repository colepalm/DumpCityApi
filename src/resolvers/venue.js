export default {
  Query: {
    venue: async (parent, { id }, { models }) => await models.Venue.findByPk(id),
    venues: async (parent, args, { models }) => await models.Venue.findAll(),
  },

  Mutation: {
    createVenue: async (parent, { venueName, city, state, country }, { models }) => {
      return await models.Venue.create({name: venueName, city, state, country});
    }
  }
}