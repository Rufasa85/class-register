const express = require('express');
const router = express.Router();
const {Teacher} = require('../models');
const bcrypt = require("bcrypt")

router.get("/",(req,res)=>{
    res.send("/api/teachers file")
})

router.post("/", (req,res)=>{
   Teacher.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }).then(newTeach=>{
        req.session.user = {
            name:newTeach.name,
            id:newTeach.id,
            email:newTeach.email,
            isTeacher:true
        }
        res.json(newTeach)
    }).catch(err=>{
        res.status(500).json({message:"something went wrong",err:err})
    })
})

router.post("/login",(req,res)=>{
    Teacher.findOne({
        where:{
            email:req.body.email
        }
    }).then(foundUser=>{
        console.log("foundUSer")
        console.log(foundUser)
        if(!foundUser){
            return res.status(401).json({message:"Login failed"})
        }
        if(bcrypt.compareSync(req.body.password,foundUser.password)){
            req.session.user = {
                name:foundUser.name,
                id:foundUser.id,
                email:foundUser.email,
                isTeacher:true
            }
            return res.json(foundUser)
        } else {
            return res.status(401).json({message:"Login failed"})
        }
    })
})

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.json({message:"logged out!"})
})


module.exports = router;