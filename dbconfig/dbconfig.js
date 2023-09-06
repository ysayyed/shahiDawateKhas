const mongoose = require('mongoose')
require('dotenv').config()

const connection = mongoose.connect(process.env.URI)
                    .then(()=>console.log("DB connected"))
                    .catch((error)=>console.log(error))

module.exports = connection