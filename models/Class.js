const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt =require("bcrypt");

class Class extends Model {}

Class.init({
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    credits: {
        type:DataTypes.INTEGER,
        allowNull:false
    },
    maxStudents:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
    
},{
    sequelize,
   
})

module.exports = Class