import mongoose,{Schema} from "mongoose";

const UserSchema=new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, 
        index: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true, 
        index: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken: {
        type: String
    }
},{timestamps:true})

export const User=mongoose.model('User',UserSchema)