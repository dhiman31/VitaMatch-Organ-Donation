const mongoose =require('mongoose');

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

userSchema.pre("save", async function (next) {
    
  if (!this.isModified("password")) return next();

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});


module.exports= new mongoose.model("User",userSchema);