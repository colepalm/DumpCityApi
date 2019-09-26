export default {
  Query: {
    venues: async (parent, args, { models }) => await models.Venue.findAll(),
  },

  Mutation: {
    createVenue: async (parent, { name, city, state, country }, { models }) => {
      return await models.Venue.create({name, city, state, country});
    }
  }
}