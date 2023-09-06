const Joi = require('joi')

const schemas = {
    Create: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('[A-Za-z0-9]$')).min(5).max(15),
        mobile: Joi.string().min(10).max(10).required()
    }),
    Login: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    ,
    FindOne: Joi.object().keys({
		id: Joi.number().required()
	}),
}

module.exports = schemas