const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('postgres://admin:admin@localhost:5432/prueba');
sequelize.define('User',{
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    }
});
sequelize.define('Player',{
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    userName:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    season: {
        type: DataTypes.ENUM('summer','winter','spring','autumn')//el Enum indica que el atributo season solo acepta esos valores.,
         
    },
    birthday:{
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    number:{
        type: DataTypes.INTEGER
    }
});
/* console.log(sequelize); */
let {User, Player} = sequelize.models;
User.sync();
console.log(User);
console.log(Player)
/* console.log(sequelize.models); */