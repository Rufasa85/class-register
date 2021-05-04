const express = require('express');
const router = express.Router();
const { Class, Teacher } = require('../models');

router.get("/", (req, res) => {
    Class.findAll({
        include: [
            {
                model: Teacher,
                attributes: ["name"]
            }
        ]
    }).then(classData=>{
        const classJson = classData.map(clas=>clas.get({plain:true}))
        classJsonUpdates = classJson.map(obj=>{
            if(req.session.user?.isTeacher && req.session.user.id ===  obj.TeacherId){
                obj.myClass=true;
            } else {
                obj.myClass=false;
            }
            return obj
        })
        console.log(classJsonUpdates);
        const isLoggedIn = req.session.user? true:false
        const isTeacher = req.session?.user?.isTeacher?true:false;
        console.log(isTeacher)
        res.render("index",{classes:classJsonUpdates,loggedIn:isLoggedIn, isTeacher,name:req.session.user?.name});
    }).catch(err=>{
        res.status(500).json(err);
    })
})
router.get("/teacherportal",(req,res)=>{
    const isLoggedIn = req.session.user? true:false
    if(isLoggedIn){
        res.redirect("/")
    }
    res.render("authPortal",{type:"Teacher",loggedIn:false})
})

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/")
})

router.get("/studentportal",(req,res)=>{
    const isLoggedIn = req.session.user? true:false
    if(isLoggedIn){
        res.redirect("/")
    }
    res.render("authPortal",{type:"Student",loggedIn:false})
})

router.get("/newclass",(req,res)=>{
    if(req.session?.user?.isTeacher){
        res.render("newclass",{loggedIn:true,isTeacher:true,name:req.session.user.name})
    } else {
        res.redirect("/teacherportal");
    }
})



module.exports = router;