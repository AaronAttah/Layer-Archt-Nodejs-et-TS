import mongoose from "mongoose";

interface UserInterface {
    id?: mongoose.Types.ObjectId,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    generateOTP(): Promise<string>
}


export default UserInterface;