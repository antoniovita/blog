const { sequelize, DataTypes } = require('sequelize');

const PostReplies = sequelize.define('PostReplies', {

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

    post_id: {
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
    }}, {
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

PostReplies.associate = (models) => {

    PostReplies.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id',
        as: 'user'
    });

    PostReplies.belongsTo(models.User, {
        foreignKey: 'post_id',
        targetKey: 'id',
        as: 'post'
    })

}