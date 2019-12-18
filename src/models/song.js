const song = (sequelize, DataTypes) => {
  return Song = sequelize.define('song', {
      date: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
              notEmpty: true,
          },
      },
  });
};