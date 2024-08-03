const mongoose=require('mongoose');
require("dotenv").config();


exports.connect=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log('Connect to database successfully')})
    .catch(err=>{console.log(`Error connecting to database ${process.env.DATABASE_URL}`);
        process.exit(1);
    });
}
