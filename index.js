const express = require('express');
const app = express();
const sequelize = require("./config/connection");
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require("dotenv").config();

const { Student,Teacher,Class } = require("./models")

const routes = require("./controllers");

const PORT = process.env.PORT || 3000;

app.use(session(
    {
      secret:process.env.SESSION_SECRET,
      resave:false,
      cookie:{
        maxAge:1000*60*60*2
      },
      saveUninitialized:true,
      store: new SequelizeStore({
        db: sequelize,
      }),
    }
  ))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use(routes);


sequelize.sync({force:false}).then(() => {
    app.listen(PORT, () => {
        console.log(`listenin to the smooth sounds of port ${PORT}`)
    })
})