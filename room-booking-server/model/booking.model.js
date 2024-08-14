import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    roomId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required :true
    },
    checkInTime : {
        type: String
    },
    checkOutTime : {
        type: String
    },
    checkInDate:{
        type:Date,
        default: Date.now(),
    },
    // checkOutDate:{
    //     type:Date
    // }
},{timestamps:true});

export default mongoose.model('Booking', bookSchema);