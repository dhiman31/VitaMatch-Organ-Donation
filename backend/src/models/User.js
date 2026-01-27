const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum: ["DONOR", "DOCTOR", "ADMIN"] 
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Hospital",
        default: null
    },
    phoneNumber: {
        type : Number
    },
    address: {
        type : String
    }
    // ,
    // isVerified: { 
    //     type: Boolean,
    //      default: false 
    // }
})

userSchema.pre('save' , async function(){
    this.password = await bcrypt.hash(this.password, saltRounds);
});


module.exports= new mongoose.model("User",userSchema);