const user=require('../data/user');
const profile=require('../data/profile');
const details=require('../data/details');

const currentUser=(req,res,next)=>{
    console.log(34);
    accountNumber=req.session.accountNumber;
    user.findOne({accountNumber:accountNumber})
        .then(user=>{
            req.logUser=user;
            // console.log(5,req.logUser,67);
            console.log(5,'userlogin',67);

            next();
        })
        .catch(err=>{console.log(53,err,67);});
}

const userIdForEachLink=(req,res,next)=>{
    // console.log(23,req.session,7);
    if(req.session.loggedIn){
        user.findById(req.session.us._id)
        .then(obj=>{
                req.getobj=obj;
                // console.log(68,req.getobj,69);
            next();
        })
        .catch((err)=>{console.log(66,err,67);});
    }
    else{
        console.log(43,'first log in',5);
        // res.render('error',{tit:'first log in',isAuthenticated:false});
        res.redirect('/login');
    }
     
};  







module.exports={
    currentUser:currentUser,
    userIdForEachLink:userIdForEachLink
}