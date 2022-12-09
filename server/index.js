const express = require('express');
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();
const {graphqlHTTP} = require('express-graphql'); 
const connectDB = require('./config/db')
const schema = require('./schema/schema')
const PORT = process.env.PORT || 5000;

const app = express();

//Connect to db
connectDB();
//setup cors for db
app.use(cors()),
//setup graphql schema and dev env
app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: process.env.NODE_ENV === 'development' // to use graphiql only in development
}))

app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`))