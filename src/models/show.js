const show = (sequelize, DataTypes) => {
  const Show =  sequelize.define('show', {
    date: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    venueId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'venues',
        key: 'id'
      },
    },
    rating: {
      type: DataTypes.FLOAT,
      unique: false,
      allowNull: true,
    },
    setlist: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      unique: true,
      allowNull: true,
    }
  });

  Show.associate = models => {
    Show.belongsTo(models.Venue, { onDelete: 'CASCADE' });
  };

  return Show;
};

export default show;