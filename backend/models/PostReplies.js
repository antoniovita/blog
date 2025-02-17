const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PostReplies = sequelize.define('PostReplies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false        
    },

    attachments: {
        type: DataTypes.JSON,
        allowNull: true,
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
    tableName: 'post_replies',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});


PostReplies.associate = (models) => {
    PostReplies.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
    });

    PostReplies.belongsTo(models.Posts, {
        foreignKey: 'post_id',
        as: 'post'
    });
};

module.exports = PostReplies;
