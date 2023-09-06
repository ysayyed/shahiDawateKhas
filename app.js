const express = require('express')
const userRoutes = require('./routes/userRoutes')
const connection = require('./dbconfig/dbconfig')
const validator = require('./middleware/validator')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/users', userRoutes)

app.use(errorHandler)



app.listen(3000,'localhost', ()=>{
    console.log("Server listening on 3000")
})