const express=require('express');
const app= express();
const userRoutes=require("./routes/User")
const profileRoutes =require("./routes/Profile")
const paymentRoutes=require("./routes/Payment")
const courseRoutes=require("./routes/Course")
const database =require("./config/database").connect();
require("dotenv").config();

const cookieParser=require("cookie-parser")
const cors= require("cors");
const {cloudinary, cloudinaryConnect} = require("./config/cloudinary")
const fileUpload= require("express-fileupload")
const dotenv = require("dotenv");
const PORT =process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: 'https://main--study-notion-app-v1.netlify.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }));

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir:"/tmp",
    })
)

cloudinaryConnect();

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);

app.get("/",(req,res)=>{
    return res.json({
        message:"your server is running "
    })
})

app.listen(PORT,()=>{
    console.log(`app is ruuning on port ${PORT}...`);
})

