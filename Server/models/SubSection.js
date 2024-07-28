const mongoose= require('mongoose');

const subSectionSchema= new mongoose.Schema({
    title:{
        type:String,
    },
    timeDuration:{
        type:String
    },
    description:{
        type:String
    },
    videoUrl:{
        type:String
    },
    Comment:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comments"
        }
    ],

})

module.exports = mongoose.model("SubSection",subSectionSchema);