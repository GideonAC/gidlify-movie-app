import express,{NextFunction, Request, Response} from 'express';
import { createMovies, deleteMovies, getMovies, updateMovies } from '../controller/moviesController';
import {auth} from "../middlewares/auth";
const router = express.Router();

/* GET users listing. */
router.get('/create-movies', (req:Request, res:Response)=>{
    res.render('CreateMovies');
});
router.post('/create', auth, createMovies);

//for the fact that we need our Users to create an account with us, before getting movies, we are authenticating the user
router.get('/get-movies', auth, getMovies);


router.get('/update-movies/:id', (req:Request, res:Response)=>{
    res.render('Edit');
});

router.post('/update-movies', auth, updateMovies)

router.post('/delete-movies/:id', deleteMovies)

export default router;
