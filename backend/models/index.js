const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const User = require('./User');
const Posts = require('./Posts');
const PostReplies = require('./PostReplies');

const models = {
  User,
  Posts,
  PostReplies
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Banco de dados sincronizado.");
  })
  .catch(error => {
    console.error("Erro ao sincronizar o banco de dados:", error);
  });


module.exports = {
  sequelize,
  User,
  Posts,
  PostReplies
};
