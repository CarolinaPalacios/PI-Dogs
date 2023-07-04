const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "temperament",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, //no hace falta poner el id, sequelize lo haca automático
    { timestamps: false }
  );
};
