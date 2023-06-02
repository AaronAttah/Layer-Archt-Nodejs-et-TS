import mongoose, { InferSchemaType } from "mongoose";
import otpGenerator from 'otp-generator';
import AccountVerification from "./accountVerification";
import jwt from 'jsonwebtoken';
import { SoftDelete, SoftDeleteModel } from 'soft-delete-mongoose-plugin'
import { set, Schema, model, connect, connection, plugin } from 'mongoose';




// defind soft delete field name
const IS_DELETED_FIELD = 'isDeleted';
const DELETED_AT_FIELD = 'deletedAt';

// use soft delete plugin
plugin(
  new SoftDelete({
    isDeletedField: IS_DELETED_FIELD,
    deletedAtField: DELETED_AT_FIELD,
  }).getPlugin(),
);

interface ISoftDelete {
  [IS_DELETED_FIELD]: boolean;
  [DELETED_AT_FIELD]: Date | null;
}

export const userSchema = new mongoose.Schema({
  // first_name: { type: String, required: false},
  // last_name: {type: String, required: false},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  isVerified: {type: Boolean, default: false},
  // phone_code: {type: String, required: true},
  // phone: {type: String, required: true},

  // role:[{type: String}],



  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
}, {timestamps: true});


declare interface IUser extends InferSchemaType<typeof userSchema> {
  generateOTP(): Promise<string>,
  verifyAccount(otp: string): Promise<{success: boolean, message?: string}>,
  generateToken(): string,
}


userSchema.methods.generateOTP = async function(): Promise<string> 
{
  const OTP = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  await AccountVerification.findOneAndDelete({user: this.id}).exec();

  await AccountVerification.create({user: this.id, otp: OTP});

  return OTP;
}

userSchema.methods.verifyAccount = async function(otp: string): Promise<{success: boolean, message?: string}>
{
  const dbOtp = await AccountVerification.findOne({user: this.id, otp: otp}).exec();

  if(!dbOtp){
    return {
      success: false, 
      message: 'The OTP provided is not valid',
    };
  }
  
  this.isVerified = true;
  await this.save();

  await AccountVerification.findOneAndDelete({user: this.id, otp: otp}).exec();

  return {
    success: true,
  };
}

userSchema.methods.generateToken = function(): string
{
  const token = jwt.sign({id: this.id, first_name: this.first_name, last_name: this.last_name}, process.env.TOKEN_SECRET!, {expiresIn: process.env.TOKEN_EXPIRES_IN});

  return token;
}

export default mongoose.model<IUser, SoftDeleteModel<IUser>>('User', userSchema);