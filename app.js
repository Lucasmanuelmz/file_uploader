const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT_APP;
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./db/database');
const PASSWORD_SECRET = process.env.PASSWORD_SECRET;
const userRouter = require('./routes/userRoutes');
const passport = require('passport');
const filesRoutes = require('./routes/filesRoutes');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.json());
const sessionStore = new SequelizeStore({
  db: sequelize,
  tableName: 'Session', 
  checkExpirationInterval: 15 * 60 * 1000, 
  expiration: 2 * 24 * 60 * 60 * 1000, 
});

app.use(session({
  secret: PASSWORD_SECRET,
  store: sessionStore,
  resave: false,
  proxy: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 2 * 24 * 60 * 60 * 100,
  }
}))
app.use(passport.authenticate('session'))

app.get('/', (req, res) => {
  res.render('index');
});
app.use('/', userRouter);
app.use('/', filesRoutes)

app.listen(PORT, () => {
  console.log('Servidor iniciado '+PORT)
})