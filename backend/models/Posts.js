const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Posts = sequelize.define('Posts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    attachments: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
     
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW 
    }
}, {
    tableName: 'posts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Posts.associate = (models) => {
    Posts.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
    });

    Posts.hasMany(models.PostReplies, {
        foreignKey: 'post_id',
        as: 'postReplies'
    });
};

module.exports = Posts;
