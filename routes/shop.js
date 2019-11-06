const express=require('express');
const router=express.Router(); 


const shop_cont=require('../controllers/shop');
const user_cont=require('../controllers/user');

router.get('/shopping',shop_cont.getIndex);

router.get('/products',shop_cont.getProduct);

router.get('/cart',user_cont.userIdForEachLink,shop_cont.getCart);

router.get('/checkout',shop_cont.getCheckout);
 
router.get('/a/:ids',user_cont.userIdForEachLink,shop_cont.getId);

router.post('/addtocart',user_cont.userIdForEachLink,shop_cont.addtocart);

router.get('/orders',user_cont.userIdForEachLink,shop_cont.getOrders);

router.get('/displayOrders',user_cont.userIdForEachLink,shop_cont.displayOrders);


module.exports=router;