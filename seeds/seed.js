const sequelize = require("../config/connection");
const { Student,Teacher,Class } = require("../models")

async function wrapper(){
    await sequelize.sync({force:true});
    const teach = await Teacher.create({
        name:"Joe",
        password:"password",
        email:"joe@joe.joe"
    })

    const myClass = await Class.create({
        title:"101 manatee jokes 101",
        description:"Learn to be the best joke teller in the seven seas!",
        credits:3,
        maxStudents: 8,
        TeacherId:1
    })

    await Student.bulkCreate([{
        name:"Denis",
        password:"password",
        email:"denis@joe.com"
    },{
        name:"Louis",
        password:"password",
        email:"louis@joe.com"
    }, {
        name:"Arra",
        password:"password",
        email:"arra@joe.com"
    }],{
        individualHooks:true    
    })
    await myClass.addStudent(1);
    await myClass.addStudent(2);
   process.exit(0);
}

wrapper();