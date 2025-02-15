const { sequelize, DataTypes } = require('sequelize');

const Posts = sequelize.define('Posts', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 

    user_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    },

    attachments: {
        type: DataTypes.ARRAY,
        allowNull: true
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
    }}, {
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

Posts.associate = (models) => {

    Posts.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id',
        as: 'user'
    });

    Posts.hasMany(models.PostReplies , {
        foreignKey: 'post_id',
        as: 'postReplies'
    })
}

module.exports = {Posts};