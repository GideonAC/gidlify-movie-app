import Joi from "joi";


export const registerUserSchema = Joi.object().keys({
    fullname: Joi.string().required(),
    username: Joi.string().trim().lowercase().required(),
    email: Joi.string().trim().lowercase().required(),
    password: Joi.string().min(5).regex(/^[a-zA-Z0-9]{5,30}$/).required(),
    confirm_password: Joi.any().equal(Joi.ref('password')).required()
    .label('Confirm password').messages({'any.only' : '{{#label}} does not match'})
    //regex(/^[a-zA-Z0-9]{5,30}$/) => This is used to specify the kind of characters that the password can take in.
    //[a-zA-Z0-9] this means that the password can take small and capital letters from A/a -Z/z and also from numbers 0 -9
    //{5,30} means password will not be less than 5 letters and not more than 30 letters
})


export const option ={
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
}

export const loginUserSchema = Joi.object().keys({
    email: Joi.string().trim().lowercase(),//.required(),
    username: Joi.string().trim().lowercase(),//.required(),
    password: Joi.string().min(5).regex(/^[a-zA-Z0-9]{5,30}$/).required(),
})


export const createMoviesSchema = Joi.object().keys({
    //id: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number().required()
})


export const updateMoviesSchema = Joi.object().keys({
    description: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number().required()
})
