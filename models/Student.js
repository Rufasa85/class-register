const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt =require("bcrypt");

class Student extends Model {}

Student.init({
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[8]
        }
    }
},{
    sequelize,
    hooks:{
        beforeCreate:async (newUser)=>{
            newUser.password = await bcrypt.hash(newUser.password,10);
        }
    }
})

module.exports = Student