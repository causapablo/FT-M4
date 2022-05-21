const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ability', {
    name : {
      type :  DataTypes.STRING,
      allowNull : false,
      unique : 'mana_name'
    },
    mana_cost:{
      type : DataTypes.REAL,
      allowNull : false,
      unique : 'mana_name',
      validate : {
        min : 10.0,
        max : 250.0
      }
    },
    description : {
      type : DataTypes.STRING
    },
    summary : {
      type : DataTypes.VIRTUAL,
      get(){
        return `${this.name} (${this.mana_cost} points of mana) - Description: ${this.description}`
      }
    }
  },
  {
    timeStamps : false
  })
}