const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      minHeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maxHeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      minWeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maxWeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      age: {
        type: DataTypes.STRING,
      },
      createdInDB: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
