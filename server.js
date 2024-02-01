const express = require('express');
const app = express();

const dotenv=require('dotenv').config()
const helmet=require('helmet')
const morgan=require('morgan')

const userRoute=require('./routes/userRoute')
const authRoute=require('./routes/authRoute')

const dbConnection=require('./dbConnection')
dbConnection()

//middlewares
app.use(express.json()) //body parser.
app.use(helmet())
app.use(morgan('common'))

//routes
app.use('/api/v1/users', userRoute)
app.use('/api/v1/auth', authRoute)

app.listen(5000, ()=>{
    console.log('Server is running on port 5000');
})