import { Timestamp } from "mongodb";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs'


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
     email:{
        type:String,
        required:true,
        unique:true
    },
     Password:{
        type:String,
        required:true
    },
    qrCode:{
        type:String
    }
    
},{
    timestamps: true,
});

 userSchema.pre('save',async function (next){
    if(!this.isModified('Password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.Password=await bcrypt.hash(this.Password,salt);

 })

 userSchema.methods.matchPassword=async function(eneteredPassword){
    return await bcrypt.compare(eneteredPassword,this.Password);
 } 
    


const User =mongoose.model('User',userSchema)

export default User