import { Request, Response } from 'express';
import { createMoviesSchema, option, updateMoviesSchema } from '../utils/utils';
import { MoviesInstance } from '../model/moviesModel';
import { v4 as uuidv4 } from 'uuid';


////////////////////////CREATE MOVIES ///////////////////////////////////////
export const createMovies = async (req: Request | any, res: Response) => {
    try {
        const verified = req.user
        

        const id = uuidv4()
        //validate with Joi
        const validateResult = createMoviesSchema.validate(req.body, option);

        //console.log(validateResult.error)
        if (validateResult.error) {
            return res.render('CreateMovies', {error: "Movie title already exist"})
        }
        
        //To check if Movie title already exist before creating a new movie
        const {title} = req.body
        const movieTitleExists = await MoviesInstance.findOne({
            where: {title: title }
        })
        console.log(validateResult)
        if(movieTitleExists){
            return res.render('CreateMovies', {error: "Movie title already exist"})
        }


        const moviesRecord = await MoviesInstance.create({
            id,
            ...req.body,
            userId: verified.id
        })
        return res
            .redirect("/my-dashboard");
    } catch (err) {
        console.log(err);
    }
};

////////////////////////GET MOVIES ///////////////////////////////////////
export const getMovies = async (req: Request, res: Response) => {

    //this is to give a limit to the number of data our page will display from the database
    const limit = req.query?.limit as number | undefined
    //const getAllMovies = await MoviesInstance.findAll();

    const getAllMovies = await MoviesInstance.findAndCountAll({limit: limit});
    
    console.log(getAllMovies)

   return res.render('MyDashboard', {
        // msg: 'You have successfully retrieved all data',
        count: getAllMovies.count,
        movies: getAllMovies.rows
    })
}

////////////////////////UPDATE MOVIES ///////////////////////////////////////
export const updateMovies = async (req: Request, res: Response) => {
    try {
        const header  = req.headers.referer
        // const moviesId = req.params
        let data: string[] | undefined = header?.split('/') as string[]
        let id = data[data.length-1].split('') 
        id.splice(id.length-1)
        const mainId = id.join('')
        //console.log(id.join(''))

        //destructuring what you want the user to be able to update
        const { title, description, image, price } = req.body
        //updateMoviesSchema

        //validating these destructured items with joi
        const validateResult = updateMoviesSchema.validate(req.body, option);

        if (validateResult.error) {
            return res
                .status(400)
                .json({ error: validateResult.error.details[0].message })
        }
        const updateMovies = await MoviesInstance.findOne({
            where: { id: mainId }
        })
        //Invalid email error message
        if (!updateMovies) {
            return res.status(404).json({
                error: "Movie not found"
            });
        }
        const updateRecord = await updateMovies.update({ title, description, image, price })
        return res.redirect('/my-dashboard')

    } catch (err) {
        console.log(err)
    }}


////////////////////////DELETE MOVIES ///////////////////////////////////////
export const deleteMovies = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        
        const deleteMovies = await MoviesInstance.findOne({
            where: { id: id }
        })

        //Invalid email error message
        if (!deleteMovies) {
            return res.status(404).json({
                error: "Movie not found"
            });
        }
        
        //Check if the user requesting to delete is the Owner that created the movie
        const userIdToDelete = req.body.userId

        // if(deleteMovies.userId !== userIdToDelete){
        //     return res.status(403).json({msg: "Permission Denied, You're only permitted to delete movies you created"})

        // }

        const updateRecord = await deleteMovies.destroy()
        return res.redirect('/my-dashboard')

    } catch (err) {
        console.log(err)
    }
}

function uuid() {
    throw new Error('Function not implemented.')
}