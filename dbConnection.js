const  mongoose  = require("mongoose")

const dbConnection=async()=>{
    try {
        const connection=await mongoose.connect(process.env.MONDO_DB_CONNECTION)
        console.log(`Connected to ${connection.connection.host}`)
    } catch (error) {
        console.log(error)
    }   
}

module.exports=dbConnection
