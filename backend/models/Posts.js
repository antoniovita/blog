const { sequelize, DataTypes } = require('sequelize');

const Posts = sequelize.define('Posts', {

    id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    }, 

    user_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    },
     
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    content: {
        type: DataTypes.STRING,
        allowNull: false
    },

    date: {
        type: DataTypes.DATE,
    }
})