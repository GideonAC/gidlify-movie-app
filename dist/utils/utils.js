"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMoviesSchema = exports.createMoviesSchema = exports.loginUserSchema = exports.option = exports.registerUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerUserSchema = joi_1.default.object().keys({
    fullname: joi_1.default.string().required(),
    username: joi_1.default.string().trim().lowercase().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string().min(5).regex(/^[a-zA-Z0-9]{5,30}$/).required(),
    confirm_password: joi_1.default.any().equal(joi_1.default.ref('password')).required()
        .label('Confirm password').messages({ 'any.only': '{{#label}} does not match' })
    //regex(/^[a-zA-Z0-9]{5,30}$/) => This is used to specify the kind of characters that the password can take in.
    //[a-zA-Z0-9] this means that the password can take small and capital letters from A/a -Z/z and also from numbers 0 -9
    //{5,30} means password will not be less than 5 letters and not more than 30 letters
});
exports.option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
exports.loginUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase(),
    username: joi_1.default.string().trim().lowercase(),
    password: joi_1.default.string().min(5).regex(/^[a-zA-Z0-9]{5,30}$/).required(),
});
exports.createMoviesSchema = joi_1.default.object().keys({
    //id: Joi.string().required(),
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    image: joi_1.default.string().required(),
    price: joi_1.default.number().required()
});
exports.updateMoviesSchema = joi_1.default.object().keys({
    description: joi_1.default.string().required(),
    image: joi_1.default.string().required(),
    price: joi_1.default.number().required()
});
