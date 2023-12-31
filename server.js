require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require ('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once ('open', () => console.log('Connected DataBase!'));

app.use(express.json())

const itemsRouter = require('./routes/items');
app.use('/items', itemsRouter)

app.listen(process.env.PORT, ()=> console.log('Server started'));