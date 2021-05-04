const Student = require("./Student");
const Teacher = require("./Teacher");
const Class = require("./Class");

Teacher.hasMany(Class);
Class.belongsTo(Teacher);

Student.belongsToMany(Class,{through:"StudentClass"})
Class.belongsToMany(Student,{through:"StudentClass"})

module.exports = {
    Student,
    Teacher,
    Class
}