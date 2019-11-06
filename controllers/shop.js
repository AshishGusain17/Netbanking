const fs=require('fs');
const path=require('path');
const PDFDocument=require('pdfkit');

const nopes=require('../data/product');
const user=require('../data/user');
const orders=require('../data/order');

const getProduct=(req,res,next)=>{
    // console.log(5);
    nopes.find()
        .then(arr=>{
            res.render('shop/product-list',{tit:'allprod_ejs',prods:arr,isAuthenticated:req.session.loggedIn});
        })
        .catch(err=>{console.log(50,err,51);});               
};

const getIndex=(req,res,next)=>{
    // console.log(11);
    nopes.find()
        .then(arr=>{
            res.render('shop/index',{tit:'index',prods:arr,isAuthenticated:req.session.loggedIn});
        })
        .catch(err=>{console.log(56,err,57);}); 
}
 
const getOrders=(req,res,next)=>{
    obj={
        items:req.getobj.cart.items,
        user:{id:req.getobj._id}
    }
    obj1=new orders(obj);
    obj1.save()
        .then(result=>{ 
            user.findById(req.getobj._id)
                .then(cart=>{
                    cart.cart={items:[]};
                    cart.save()
                        .then(a=>{
                            orders.find().populate('items.productId')
                                    .then(ar=>{
                                        console.log(34,ar,87);
                                        arr=ar.filter(pa=>{
                                            return (pa.user.id.toString()===req.getobj._id.toString())
                                        })
                                        res.render('shop/orders',{tit:'ord',orders:arr,isAuthenticated:req.session.loggedIn}); 
                                    })
                                    .catch(err=>{console.log(56,err,98);});
                            })
                            .catch(err=>{console.log(156,err,298);});
                    })
        })
        .catch(err=>{console.log(3,err,4);})
}


const displayOrders=(req,res,next)=>{
    orders.find().populate('items.productId')
            .then(ar=>{
                console.log(34,ar,87);
                arr=ar.filter(pa=>{
                    return (pa.user.id.toString()===req.getobj._id.toString())
                })
                res.render('shop/orders',{tit:'ord',orders:arr,isAuthenticated:req.session.loggedIn}); 
            })
            .catch(err=>{console.log(56,err,98);});
}

const getCheckout=(req,res,next)=>{
    console.log('15');
    res.render('shop/checkout',{tit:'checkout',isAuthenticated:true});
    console.log('16');
}
     
const getId=(req,res,next)=>{
    console.log('19');
    console.log(req.params,req.params.ids,59);
    const idhere=req.params.ids;
    nopes.findById(idhere)
                .then(obj=>{
                    console.log(60,obj,61);
                    res.render('shop/product-detail',{tit:'detailinsingle',obj:obj,isAuthenticated:req.session.loggedIn});
                })
                .catch(err=>{console.log(56,err,57);});  
} 

const getCart=(req,res,next)=>{
    let passing=[];
    req.getobj.populate('cart.items.productId').execPopulate()
            .then((obj)=>{
                passing=obj.cart.items;
                console.log(76,passing,77);
                res.render('shop/cart',{tit:'cartofuser',passing:passing,totalpr:36,isAuthenticated:req.session.loggedIn});
            })
            .catch((err)=>{console.log(74,err,75);})    
    console.log(14);
}
    //  {   name:
    //      email:
    //      cart:{items:[{},{}]}
    //  }
const addtocart=(req,res,next)=>{
    const idcheck=req.body.detailid;
    const iduser=req.getobj._id;
    itemss=req.getobj.cart.items;
    console.log(23,'adding_cart',34);
    nopes.findById(idcheck)
            .select('_id')
            .then(obj1=>{
                console.log(84,obj1,85);
                newobj1={productId:obj1._id,qty:1};
                let ind=-1;
                ind=itemss.findIndex((pa)=>{
                    return (pa.productId.toString()===idcheck.toString());
                })
                console.log(92,ind,93)
                if(ind===-1){
                    upcart={items:[...itemss,newobj1]} ;
                }
                else{
                    itemss[ind].qty=itemss[ind].qty+1 ;
                    upcart={items:itemss} ;
                }
                console.log(67,upcart,23);
                user.findById(iduser)
                    .then(ob=>{
                        ob.cart=upcart;
                        ob.save()
                            .then(re=>{
                                res.redirect('/products');
                            })
                            .catch(err=>{console.log(49,err,23);});
                    })
                    .catch(err=>{console.log(2,err,67);});
            })
            .catch(err=>{console.log(2,err,67);});
 
                
}; 


 
module.exports={
    getCheckout:getCheckout,
    getCart:getCart,
    getProduct:getProduct,
    getIndex:getIndex,
    getOrders:getOrders,
    getId:getId,
    addtocart:addtocart,
    displayOrders:displayOrders
}     

