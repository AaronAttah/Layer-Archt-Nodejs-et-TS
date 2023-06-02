import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    otp: {type: String, required: true},
}, {timestamps: true});

export default mongoose.model('AccountVerification', otpSchema);