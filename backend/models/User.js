const mongoose=require('mongoose');

const Userschema= new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true

    },
    emailtype:{
        type:String,
        require:true,
        max:50,
        unique:true,

    },
    password:{
        type:String,
        require:true,
        min:6,

    },

},{timestamps:true});
module.exports = mongoose.model('User',Userschema)