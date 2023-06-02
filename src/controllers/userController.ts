import { Request, Response } from 'express';
import STATUSCODE from '../utils/statusCodes'
import UserServices from '../services/user.services'

export const create = async(req: Request, res: Response) =>{
    try {
    
      const data = await UserServices.createUser(req.body)
     
      return  res.status(data.STATUS_CODE).json({
            status: data.STATUS,
            message: data.MESSAGE,
            data: data.DATA
          });
  
    
    } catch (error) {
        // console.log(error)
      return res.status(STATUSCODE.SERVER_ERROR).json({
        status: "failed",
        error: error,
      });
    }
}