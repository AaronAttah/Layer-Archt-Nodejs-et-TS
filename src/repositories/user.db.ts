import userModel from '../models/userModel'
import UserInterface from '../constants/interfaces/userInterfaces'


class UserDB {
    static async create(data:UserInterface){

        const user = await userModel.create( data );
        return user;
    }

    static async findOneById(filter:any){
        const user = await userModel.findOne({ email: filter });
        return user;
    }
    static async findOneByEmail(filter:any){
        
        const user = await userModel.findOne({ email: filter });
        return user;
    }

}

export default UserDB