const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Client",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      dni: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      birthdate:{
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      tel:{
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      adress: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
      visit:{
        type: DataTypes.TEXT,
        unique: false,
        allowNull: true,
      },
      blacklist:{
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      email:{
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      description:{
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
    },
  );
};
