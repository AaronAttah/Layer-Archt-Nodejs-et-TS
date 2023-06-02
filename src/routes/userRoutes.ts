import express  from 'express'
import {create} from '../controllers/userController'
import {registerUserValidation} from '../middleware/validations/userValidation';

const userRoutes = express.Router()

userRoutes.post("/", registerUserValidation, create)


export default userRoutes
