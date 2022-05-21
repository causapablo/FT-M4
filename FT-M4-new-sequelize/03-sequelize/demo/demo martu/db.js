const {Sequelize, DataTypes} = require('sequelize');
const modelUser = require('./modelos/User');
const modelPlayer = require('./modelos/Player');


const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/prueba');

modelUser(sequelize);
modelPlayer(sequelize);
sequelize.define('Team',{
    name:{
        type: DataTypes.STRING
    }
})
let {User, Player, Team } = sequelize.models;
Player.belongsToMany(Team,{through: 'PlayerXTeam'});
Team.belongsToMany(Player, {through : 'PlayerXTeam'});



module.exports = {
    ...sequelize.models,
    db: sequelize
}