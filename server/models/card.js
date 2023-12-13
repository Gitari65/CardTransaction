const mongoose=require('mongoose');
const schema=mongoose.Schema;

const transactionSchema=new schema({
    amount:{type:Number,required:true},
    date:{type:date,required:true,default:Date.now}
})
const cardSchema= new schema({
    cardNumber:{type:String,required:true,unique:true},
    owner:{type:schema.Types.ObjectId,ref:'User'},
    balance:{type:Number,default:0},
    transactions:[transactionSchema]
})
module.exports=mongoose.model('Card',cardSchema);

