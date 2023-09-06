const User = require('../models/User')

class UserController{
    async create(req, res, next){
        try{
            const user = await User.create(payload)
            res.status(201).send(user)
        }
        catch(error){
            next(error)
        }
    }

    async login(req, res, next){
        try{
            const user = await User.login(req.body.email, req.body.password)
            res.cookie('email', req.body.email, {httpOnly: true, maxAge: 3*24*60*60*1000})
            res.status(200).send(user)
        }
        catch(error){
            next(error)
        }
    }

    async findAll(req, res, next){
        try{
            // This will only select id, first_name, last_name and email 
            const users = await User.find({}, {password: 0})
            console.log(users)
            res.status(200).send(users)
        }
        catch(error){
            next(error)
        }
    }

    async findOne(req,res,next){
        try{
            const user = await User.findById(req.params.id, {password: 0}).exec()
            res.status(200).send(user)

        }
        catch(error){
            next(error)
        }
    }

    async search(req, res, next){
        const user = await User.aggregate([
            { $match: {first_name: req.body.first_name}},
            { $project: {id: 1, first_name: 1, last_name:1 , email: 1}},
          
        ])
        res.send(user)

    }

    async update(req,res,next){
        try{
            await User.findByIdAndUpdate(req.params.id, req.body)
            const updated = await User.findById(req.params.id, {password:0}).exec()
            res.status(200).send(updated)
        }
        catch(error){
            next(error)
        }
    }

}

module.exports = UserController