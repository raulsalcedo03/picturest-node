const express = require('express');
const { json, urlencoded } = require('body-parser');
const morgan = require('morgan');
const config = require('./config.js');
const cors = require('cors');
const pinsRouter = require('./resources/pins/pins.router');
const boardsRouter = require('./resources/boards/boards.router');
const usersRouter = require('./resources/users/users.router');
const jwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
const persimon = require('./utils/persimon');
const db = persimon('/assets/users.json');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongo = require ("./config/mongo");

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api/pins', pinsRouter);
app.use('/api/boards', boardsRouter);
app.use('/api/users', usersRouter);
app.use('/healthcheck', (req, res) => {
  console.log('GET healthcheck!');
  return res.status(200).json({ message: 'OK' });
});

const start = async () => {
  try {
    secretToken = 'picturest';
    app.post('/login', (req, res) => {
      const { email, password } = req.body;
      const user = db.all().find(u => { return u.email === email && u.password === password });
      if (user) {
        // const accessToken = jwt.sign({ email: user.email, role: 'admin' }, accessToken);
        const token = jsonwebtoken.sign({ email: user.email, role: 'admin' }, process.env.TOKEN_SECRET);
        res.json(token);
      }
      else {
        res.status(404).send('Email o contraseña incorrecta');
      }
    })
    app.get('/protected', jwt({ secret: process.env.TOKEN_SECRET, algorithms: ['HS256'] }), (req, res) => {
      res.send('protected');
    });
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  start,
  app,
};
