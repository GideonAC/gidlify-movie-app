"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../model/userModel");
const jwtsecret = process.env.JWT_SECRET;
async function auth(req, res, next) {
    // const authorization = req.headers.authorization
    // if (!authorization){
    //     return res.render('Login',{error: 'Kindly login or sign up'})
    // }
    // const token = authorization.slice(7, authorization.length);
    const { token } = req.cookies;
    if (!token) {
        return res.redirect('/login');
    }
    let verified = jsonwebtoken_1.default.verify(token, jwtsecret);
    if (!verified) {
        return res.status(401).json({ error: 'Invalid token. You cannot access this route' });
    }
    const { id } = verified;
    //Check if the user exist
    const user = await userModel_1.UserInstance.findOne({ where: { id } });
    if (!user) {
        return res.status(401).json({ error: 'Kindly sign-up as a user' });
    }
    console.log(req.user);
    req.user = verified;
    next();
}
exports.auth = auth;
