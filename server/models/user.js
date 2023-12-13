const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bcrypt=require('bcrypt');

const userSchema= new Schema({
    username:{type:String,unique:true, required:true},

    password:{type:String, required:true}
})

userSchema.pre('save',async function(next){
    try {
        const salt =await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(this.password,salt);
        this.password=hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
    userSchema.methods.comparePassword=async function (password) {
        return bcrypt.compare(password,this.password);
    } 
})
module.exports=mongoose.model('User',userSchema)