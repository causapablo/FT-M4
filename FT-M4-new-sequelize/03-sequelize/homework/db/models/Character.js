const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Character', {
    code : {
      type : DataTypes.STRING,
      primaryKey : true,
      validate : {
        len : [0,5],
        notIn: [['henRY','HeNrY']]
      }
    },
    name : {
      type : DataTypes.STRING,
      unique : true,
      allowNull : false,
      validate : {
        notIn: [['Henry', 'SoyHenry', 'Soy Henry']]
      }
    },
    age : {
      type : DataTypes.INTEGER
    },
    race : {
      type : DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'),
      defaultValue : 'Other'
    },
    hp : {
      type : DataTypes.FLOAT,
      allowNull : false
    },
    mana : {
      type : DataTypes.FLOAT,
      allowNull : false
    },
    date_added : {
      type : DataTypes.DATEONLY,
      defaultValue : DataTypes.NOW
    }
  },
  {
    timestamps: false
  });
}