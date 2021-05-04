const express = require('express');
const app = express();
const sequelize = require("./config/connection");

const { Student,Teacher,Class } = require("./models")

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
})


sequelize.sync({force:true}).then(() => {
    app.listen(PORT, () => {
        console.log(`listenin to the smooth sounds of port ${PORT}`)
    })
})