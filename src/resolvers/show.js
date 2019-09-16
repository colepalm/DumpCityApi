import Sequelize from "sequelize";

export default {
  Query: {
    shows: async (parent, args, { models }) => await models.Show.findAll(),
  },

  Mutation: {
    createShow: async (parent, { date, venue }, { models }) => {
      const show = await models.Show.create({ date, venue })
      return show;
    }
  }
}