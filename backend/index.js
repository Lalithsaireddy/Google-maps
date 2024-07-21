const express= require('express');
const mongoose= require('mongoose');
const app= express();
const dotenv=require('dotenv');
const pinroute=require('./routes/pins');
const userroute=require('./routes/users');
const User= require("./models/User");
const bcrypt= require('bcrypt');

dotenv.config();
app.use(express.json())
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('MongoDb connected');
})
.catch((err)=>{
    console.log("error occured",err.message)
});
app.use("/api/pins",pinroute)
app.use("/api/users",userroute);




app.listen(210,()=>{
    console.log("server is starting");
})


