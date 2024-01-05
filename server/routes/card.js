const express=require('express');
const app=express();
const router=express.Router();
const cardController=require('../controllers/cards');
const authMiddleware=require('../middleware/auth');

app.use(authMiddleware);

router.post('/addCard',cardController.addCard);
router.post('/makeTransaction',cardController.makeTransaction);
router.post('/getAllCards',cardController.getAllCards);

 
module.exports=router;

