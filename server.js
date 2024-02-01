const express = require('express');
const app = express();

const dotenv=require('dotenv').config()
const helmet=require('helmet')
const morgan=require('morgan')

const userRoute=require('./routes/userRoutes')

const dbConnection=require('./dbConnection')
dbConnection()

//middlewares
app.use(express.json()) //body parser.
app.use(helmet())
app.use(morgan('common'))

//routes
app.use('/api/v1/users', userRoute)

app.listen(5000, ()=>{
    console.log('Server is running on port 5000');
})