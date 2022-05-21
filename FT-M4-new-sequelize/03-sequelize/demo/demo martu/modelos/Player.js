const { DataTypes } = require('sequelize');

module.exports = sequelize=>{
    sequelize.define('Player', {
        firstName: {
            type: DataTypes.STRING,
            get(){
                return `Este es mi nombre de pila ${this.getDataValue('firstName')}`
            }
        },
        lastName: {
            type: DataTypes.STRING,
            set(value){//Setea la forma en que queremos que se guarda la informacion.
                this.setDataValue('lastName', value.toUpperCase());
            }
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        season: {
            type: DataTypes.ENUM('summer', 'winter', 'spring', 'autumn')//el Enum indica que el atributo season solo acepta esos valores.,
    
        },
        birthday: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        },
        number: {
            type: DataTypes.INTEGER,
            validate: {
                min : 1,
                max : 15
            },
            get(){//este get va a definir como quiero que se devuelva la informacion.
                return this.getDataValue('number')+' mi numero.'
            }
        },
        fullName : {//Virtual Fields.
            type :  DataTypes.VIRTUAL,//El DataType.VIRTUAL NO GUARDA EN LA DB, pero puedo consultarla.
            get(){
                return `${this.firstName} ${this.lastName}.`
            }
        }
    },
        {//Definimos el timestamp que queremos y lo renombramos. 
            timestamps: true,
            createdAt: false,
            updatedAt: "Actualizado"
        });
}