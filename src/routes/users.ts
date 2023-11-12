import express from 'express';
import { Login, Register } from '../controller/userController';
const router = express.Router();

/* GET users listing. */
router.post('/sign-up', Register);
router.post('/login', Login) 



export default router;