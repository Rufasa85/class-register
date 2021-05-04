const express = require('express');
const router = express.Router();
const db = require('../models');

const studentRoutes = require("./students")
const teacherRoutes = require("./teachers")
const classesRoutes = require("./classes")

router.use("/api/students",studentRoutes);
router.use("/api/teachers",teacherRoutes);
router.use("/api/classes",classesRoutes);

router.get("/sessiondata",(req,res)=>{
    res.json(req.session);
})
module.exports = router;