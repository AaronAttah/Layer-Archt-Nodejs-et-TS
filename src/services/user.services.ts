import STATUSCODE from "../utils/statusCodes";
import userDB from "../repositories/user.db";
import UserInterface from '../constants/interfaces/userInterfaces'


class UserService {

  static async createUser(data: any) {

    const user = await userDB.findOneByEmail(data.email);

   
    if(user) return {
        STATUS_CODE: STATUSCODE.BAD_REQUEST,
        STATUS: "failed ",
        MESSAGE: "user already exist",
      };
    
      
      const createduser = await userDB.create(data);

      console.log({data:data})
      

    return {
      STATUS_CODE: STATUSCODE.CREATED,
      STATUS: "success",
      MESSAGE: "created successfully",
      DATA: createduser,
    };
  }

}

export default UserService;
