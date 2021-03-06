require('dotenv').config()

const express= require('express');
const app = express();
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true, useUnifiedTopology:true})

mongoose.set('useCreateIndex', true)

const db = mongoose.connection;
db.on('error',(error) => console.error(error));
db.once('open', () => console.log("Connected to Database"));

app.use(express.json())

const userRouter = require('./routes/users')
const loginRoute = require('./routes/login')

app.use('/user',userRouter);
app.use('/',loginRoute);

app.listen(5000,() => console.log("Server started"));