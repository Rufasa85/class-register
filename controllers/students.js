const express = require('express');
const router = express.Router();
const {Student,Class} = require('../models');
const bcrypt = require("bcrypt");

router.get("/",(req,res)=>{
    res.send("/api/students file")
})

router.post("/", (req,res)=>{
   console.log(req.body)
   Student.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    }).then(newStu=>{
        req.session.user = {
            name:newStu.name,
            id:newStu.id,
            email:newStu.email,
            isStudent:true
        }
        res.json(newStu)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"something went wrong",err:err})
    })
    
})


router.post("/login",(req,res)=>{
    Student.findOne({
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
                isStudent:true
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

router.post("/registerclass/:id",(req,res)=>{
    if(!req.session?.user?.isStudent){
        return res.status(403).json({message:"you cant do that"})
    }
    Student.findByPk(req.session.user.id).then(foundStudent=>{
        foundStudent.addClass(req.params.id);
        res.status(200).json({message:"successfully registered!"})
    }).catch(err=>{
        res.status(500).json({message:"something went wrong"})
    })
})

router.delete("/dropclass/:id",(req,res)=>{
    if(!req.session?.user?.isStudent){
        return res.status(403).json({message:"you cant do that"})
    }
    Student.findByPk(req.session.user.id,{
        include:[Class]
    }).then(foundStudent=>{
        const classIds = foundStudent.Classes.map(thisClass=>thisClass.id);
        console.log(classIds)
        console.log(req.params)
        if(classIds.includes(parseInt(req.params.id))){
            foundStudent.removeClass(req.params.id);
            res.status(200).json({message:"successfully dropped!"})
        }else {
            res.status(404).json({message:"you are not enrolled in that class"})
        }
    }).catch(err=>{
        res.status(500).json({message:"something went wrong"})
    })
})

module.exports = router;