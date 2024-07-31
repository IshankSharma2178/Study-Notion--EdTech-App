const mongoose = require('mongoose');
const now= new Date();

const commentsSchema = new mongoose.Schema({
    Comment:{
        type: "string"
    },
    UserNameOfComment: {
        type: "string",
    },
    UserImageOfComment: {
        type: "string",
    },
    createdAt:{
        type:Date,
        default:now,
    },
    Likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Likes"
        }
    ],
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true  
    },
})

module.exports = mongoose.model("Comments",commentsSchema);