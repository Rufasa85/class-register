const express = require('express');
const router = express.Router();
const {Class,Teacher,Student} = require('../models');

router.get("/",(req,res)=>{
    Class.findAll({
    
    }).then(classData=>{
        res.json(classData)
    }).catch(err=>{
        res.status(500).json(err)
    })
})

router.get("/withdata",(req,res)=>{
    Class.findAll({
        include:[{
            model:Teacher,
            attributes:{
                exclude:["password"]
            }
        },{
            model:Student,
            attributes:{
                exclude:["password"]
            }
        }]
    }).then(classData=>{
        res.json(classData)
    }).catch(err=>{
        res.status(500).json(err)
    })
})

router.post("/",(req,res)=>{
    if(!req.session?.user?.isTeacher ){
        return res.status(403).json({message:"you cant do that"})
    }
    Class.create({
        title:req.body.title,
        description:req.body.description,
        credits:req.body.credits,
        maxStudents:req.body.maxStudents,
        TeacherId:req.session.user.id
    }).then(newClass=>{
        res.status(200).json(newClass);
    }).catch(err=>{
        res.status(500).json(err);
    })
})

module.exports = router;