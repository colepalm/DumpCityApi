export default {
  Query: {
    shows: async (parent, args, { models }) => await models.Show.findAll(),
  },

  Mutation: {
    createShow: async (parent, { date, venue }, { models }) => {
      return await models.Show.create({date, venue});
    }
  }
}