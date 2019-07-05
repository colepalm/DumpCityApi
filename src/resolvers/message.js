export default {
  Query: {
    messages: async (parent, args, { models }) => await models.Message.findAll(),
    message: async (parent, { id }, { models }) => await models.User.findByPk(id),
  },

  Mutation: {
    createMessage: async (parent, { text }, { me, models }) => {
      try {
        return await models.Message.create({
          text,
          userId: me.id
        })
      } catch (error) {
        throw new Error(error);
      }
    },

    deleteMessage: async (parent, { id }, { models }) => {
      await models.Message.destroy({ where: { id } });
    },
  },

  Message: {
    user: async (message, args, { models }) => await models.User.findByPk(message.userId),
  },
}