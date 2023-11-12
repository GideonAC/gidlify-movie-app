"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const moviesModel_1 = require("../model/moviesModel");
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    // console.log(req.user)
    const limit = req.query?.limit;
    const getAllMovies = await moviesModel_1.MoviesInstance.findAndCountAll({ limit: limit });
    console.log(req);
    return res.render('Home', {
        // msg: 'You have successfully retrieved all data',
        count: getAllMovies.count,
        movies: getAllMovies.rows
    });
});
router.get('/login', (req, res) => {
    res.render('Login');
});
router.get('/sign-up', (req, res) => {
    res.render('SignUp');
});
router.get('/about', (req, res) => {
    res.render('About');
});
router.get('/my-dashboard', auth_1.auth, async (req, res) => {
    // console.log(req.user)
    const limit = req.query?.limit;
    const getAllMovies = await moviesModel_1.MoviesInstance.findAndCountAll({
        where: { userId: req.user.id },
        limit: limit,
    });
    console.log(req.user);
    return res.render('MyDashboard', {
        // msg: 'You have successfully retrieved all data',
        count: getAllMovies.count,
        user: req.user.fullname,
        movies: getAllMovies.rows
    });
});
router.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.redirect('/');
});
exports.default = router;
