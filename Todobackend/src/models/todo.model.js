import mongoose,{Schema} from "mongoose";

const todoSchema=new Schema({
    text:{
        type:String,
        required:true,
        index:true
        
    },
    completed:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

export const Todo=mongoose.model("Todo",todoSchema)