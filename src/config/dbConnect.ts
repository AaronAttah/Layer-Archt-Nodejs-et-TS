import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// The applicaton middleware below is to compress default mongoose error due to upcoming upgrade from mongoose
mongoose.set('strictQuery', true);

const  dbConnect = async() => {
        await mongoose.connect(process.env.KEY!)
        .then(_result => {
            console.log('Connected to the db...');

        }).catch(err => {
            console.log(err);
        });
};
export default dbConnect

