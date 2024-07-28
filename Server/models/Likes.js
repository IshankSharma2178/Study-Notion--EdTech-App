const mongoose = require('mongoose');

const LikesSchema = new mongoose.Schema({
    user:{
        type: 'string',
    }
    
})

module.exports = mongoose.model("Likes",LikesSchema);