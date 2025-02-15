const {sequelize, DataTypes} = require('sequelize');

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

User.associate = (models) => {

    User.hasMany(models.Posts, {
        foreignKey: 'user_id',
        as: 'posts'
    }),

    User.hasMany(models.PostReplies, {
        foreignKey: 'user_id',
        as: 'postreplies'
    })
}



module.exports = {User};