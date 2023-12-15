const Card=require('../models/card');

exports.getAllCards=async (req,res)=>{
    try {
        const cards= await Card.find().populate('owner');
        res.json(cards);

    } catch (error) {
        res.status(500).json({error:"internal server error"});

    }
}
exports.addCard=async(req,res)=>{
    try{
        const {cardNumber,owner,balance}=req.body;
        const newCard= new  Card({cardNumber,owner,balance});
        await newCard.save();
        res.json(newCard);
    }
    catch(error){
        res.status(500).json({error:"internal server error"});
    }
}
exports.makeTransaction=async (req,res)=>{
    try {
        const {cardId,amount,transactionType}=req.body;
        const card=Card.findById(cardId);
        if (!card){
            res.status(400).json({error:"Card not found"});

        } 
        if(transactionType==='withdraw'||transactionType==='send') 
        {
         if (card.balance<amount){
            res.status(400).json({error:"Card not found"});
        }    
        if(transactionType==='withdraw'){
           card.balance-=amount; 
            //add transaction to the history
        card.transactions.push({amount});

        await card.save();
        res.status(200).json({message:"Withdraw Successful",card});

        }
        if(transactionType==='deposit'){
            card.balance+=amount;
            card.transactions.push({amount});
            await card.save();
            res.status(200).json({message:"Deposit Successful",card});


        }
        }   
        
        //add transaction to the history
        card.transactions.push({amount});

        await card.save();
        res.status(200).json({message:"Transaction Successful",card});

        
    } catch (error) {
        res.status(500).json({error:"Internal server error"});
    }
}
