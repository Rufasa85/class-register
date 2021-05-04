const express = require('express');
const sequelize = require("./config/connection");
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require("express-handlebars");

const app = express();
require("dotenv").config();
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

app.use(express.static("public"));

const hbs = exphbs.create({})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);


sequelize.sync({force:false}).then(() => {
    app.listen(PORT, () => {
        console.log(`listenin to the smooth sounds of port ${PORT}`)
    })
})