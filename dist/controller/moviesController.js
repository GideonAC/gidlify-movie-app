"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovies = exports.updateMovies = exports.getMovies = exports.createMovies = void 0;
const utils_1 = require("../utils/utils");
const moviesModel_1 = require("../model/moviesModel");
const uuid_1 = require("uuid");
////////////////////////CREATE MOVIES ///////////////////////////////////////
const createMovies = async (req, res) => {
    try {
        const verified = req.user;
        const id = (0, uuid_1.v4)();
        //validate with Joi
        const validateResult = utils_1.createMoviesSchema.validate(req.body, utils_1.option);
        //console.log(validateResult.error)
        if (validateResult.error) {
            return res.render('CreateMovies', { error: "Movie title already exist" });
        }
        //To check if Movie title already exist before creating a new movie
        const { title } = req.body;
        const movieTitleExists = await moviesModel_1.MoviesInstance.findOne({
            where: { title: title }
        });
        console.log(validateResult);
        if (movieTitleExists) {
            return res.render('CreateMovies', { error: "Movie title already exist" });
        }
        const moviesRecord = await moviesModel_1.MoviesInstance.create({
            id,
            ...req.body,
            userId: verified.id
        });
        return res
            .redirect("/my-dashboard");
    }
    catch (err) {
        console.log(err);
    }
};
exports.createMovies = createMovies;
////////////////////////GET MOVIES ///////////////////////////////////////
const getMovies = async (req, res) => {
    //this is to give a limit to the number of data our page will display from the database
    const limit = req.query?.limit;
    //const getAllMovies = await MoviesInstance.findAll();
    const getAllMovies = await moviesModel_1.MoviesInstance.findAndCountAll({ limit: limit });
    console.log(getAllMovies);
    return res.render('MyDashboard', {
        // msg: 'You have successfully retrieved all data',
        count: getAllMovies.count,
        movies: getAllMovies.rows
    });
};
exports.getMovies = getMovies;
////////////////////////UPDATE MOVIES ///////////////////////////////////////
const updateMovies = async (req, res) => {
    try {
        const header = req.headers.referer;
        // const moviesId = req.params
        let data = header?.split('/');
        let id = data[data.length - 1].split('');
        id.splice(id.length - 1);
        const mainId = id.join('');
        //console.log(id.join(''))
        //destructuring what you want the user to be able to update
        const { title, description, image, price } = req.body;
        //updateMoviesSchema
        //validating these destructured items with joi
        const validateResult = utils_1.updateMoviesSchema.validate(req.body, utils_1.option);
        if (validateResult.error) {
            return res
                .status(400)
                .json({ error: validateResult.error.details[0].message });
        }
        const updateMovies = await moviesModel_1.MoviesInstance.findOne({
            where: { id: mainId }
        });
        //Invalid email error message
        if (!updateMovies) {
            return res.status(404).json({
                error: "Movie not found"
            });
        }
        const updateRecord = await updateMovies.update({ title, description, image, price });
        return res.redirect('/my-dashboard');
    }
    catch (err) {
        console.log(err);
    }
};
exports.updateMovies = updateMovies;
////////////////////////DELETE MOVIES ///////////////////////////////////////
const deleteMovies = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteMovies = await moviesModel_1.MoviesInstance.findOne({
            where: { id: id }
        });
        //Invalid email error message
        if (!deleteMovies) {
            return res.status(404).json({
                error: "Movie not found"
            });
        }
        //Check if the user requesting to delete is the Owner that created the movie
        const userIdToDelete = req.body.userId;
        // if(deleteMovies.userId !== userIdToDelete){
        //     return res.status(403).json({msg: "Permission Denied, You're only permitted to delete movies you created"})
        // }
        const updateRecord = await deleteMovies.destroy();
        return res.redirect('/my-dashboard');
    }
    catch (err) {
        console.log(err);
    }
};
exports.deleteMovies = deleteMovies;
function uuid() {
    throw new Error('Function not implemented.');
}
