import Joi from "@hapi/joi"

export const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required().error(new Error('Enter a valid email')),
    password:Joi.string().pattern(new RegExp('^(?=.*[@_!#$%*&])[A-Za-z0-9@_!#$%*&]{8,}$'))
    .required().error(new Error('Enter a valid password'))

})


