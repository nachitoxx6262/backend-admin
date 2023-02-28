const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Empresa",
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
      cuit: {
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
      email:{
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
      visit:{
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
      description:{
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
      blacklist:{
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        defaultValue: "false",
      },
    },
  );
};
