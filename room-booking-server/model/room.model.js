import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomNo:{
        type:Number,
        required:true,
        unique:true
    },
    type:{
        type:String,
        default:"Non-AC",
        enum:["AC", "Non-AC"]
    },
    status:{
        type:String,
        default:"Available",
        enum:["Available", "Not-Available"]
    }
},{timestamps:true});

export default mongoose.model('Room', roomSchema);