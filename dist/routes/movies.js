"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moviesController_1 = require("../controller/moviesController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
/* GET users listing. */
router.get('/create-movies', (req, res) => {
    res.render('CreateMovies');
});
router.post('/create', auth_1.auth, moviesController_1.createMovies);
//for the fact that we need our Users to create an account with us, before getting movies, we are authenticating the user
router.get('/get-movies', auth_1.auth, moviesController_1.getMovies);
router.get('/update-movies/:id', (req, res) => {
    res.render('Edit');
});
router.post('/update-movies', auth_1.auth, moviesController_1.updateMovies);
router.post('/delete-movies/:id', moviesController_1.deleteMovies);
exports.default = router;
