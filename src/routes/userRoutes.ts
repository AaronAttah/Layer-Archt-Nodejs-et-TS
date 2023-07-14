import express  from 'express'
import {create} from '../controllers/userController'
import {registerUserValidation} from '../middleware/validations/userValidation';

const userRoutes = express.Router()

userRoutes.post("/", registerUserValidation, create)
userRoutes.get("/", (req,res) =>{
   return  res.send("health check on users routes")
})


export default userRoutes
