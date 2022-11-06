import {model, Schema } from "mongoose";

const userSchema = new Schema({    
    name:String,
    username:String,
    email:String,
    password:String,
    isSuperAdmin:Boolean,
    isAdmin:Boolean
})

userSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const User = model( 'User',userSchema)

export default User