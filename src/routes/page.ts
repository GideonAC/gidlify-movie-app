import express, {NextFunction, Request, Response} from "express";
import { auth } from "../middlewares/auth";
import { JwtPayload } from "jsonwebtoken";
import { MoviesInstance } from "../model/moviesModel";

const router = express.Router();

router.get('/', async (req:JwtPayload, res:Response)=>{
    // console.log(req.user)
    const limit = req.query?.limit as number | undefined

    const getAllMovies = await MoviesInstance.findAndCountAll({limit: limit});
    
    console.log(req)

    return res.render('Home', {
        // msg: 'You have successfully retrieved all data',
        count: getAllMovies.count,
        movies: getAllMovies.rows
    })
});

router.get('/login', (req:Request, res:Response)=>{
    res.render('Login');
});

router.get('/sign-up', (req:Request, res:Response)=>{
    res.render('SignUp');
});

router.get('/about', (req:Request, res:Response)=>{
    res.render('About');
});

router.get('/my-dashboard', auth, async (req:JwtPayload, res:Response)=>{
    // console.log(req.user)
    const limit = req.query?.limit as number | undefined

    const getAllMovies = await MoviesInstance.findAndCountAll({
        where: {userId: req.user.id},
        limit: limit,
    });
    
    console.log(req.user)

    return res.render('MyDashboard', {
        // msg: 'You have successfully retrieved all data',
        count: getAllMovies.count,
        user: req.user.fullname,
        movies: getAllMovies.rows
    })
});


router.get('/logout', (req:Request, res:Response)=>{
    res.clearCookie("token")
    res.redirect('/');
});

export default router