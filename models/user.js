'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthday: DataTypes.DATE,
    displayname: DataTypes.STRING,
    zipcode: DataTypes.INTEGER,
    pic:DataTypes.STRING,
    bio: DataTypes.TEXT,
    admin: DataTypes.BOOLEAN
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};