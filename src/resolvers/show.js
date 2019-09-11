import Sequelize from "sequelize";

export default {
  Query: {
    shows: async (parent, args, { models }) => await models.Show.findAll(),
  }
}