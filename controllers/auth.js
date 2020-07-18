const user=require('../data/user');
const profile=require('../data/profile');
const details=require('../data/details');
const nodemailer=require('nodemailer');

const getSignup=(req,res,next)=>{
    res.render('auth/signup',{tit:'signup',messageL:false,messageS:false,isAuthenticated:false});
}

const postSignup=(req,res,next)=>{
    password=+req.body.password;
    confirmPassword=+req.body.confirmPassword;
    accountNumber=+req.body.accountNumber;
    // email=req.body.email;
    object={
        password:password,
        amount:2000,
        accountNumber:accountNumber,
        details:[],
        // email:email,
        cart:{items:[]}
    };
    user.findOne({accountNumber:accountNumber})
        .then(obj=>{
            if(obj){
                res.render('auth/signup',{tit:'signup_again',messageL:false,messageS:'User already exists',isAuthenticated:req.session.loggedIn});
            }
            else{
                console.log(67,password,confirmPassword,89);
                if(password===confirmPassword){
                    obj1=new user(object);
                    obj1.save()
                        .then(a=>{
                            res.redirect('/');
                        })
                        .catch(err=>{console.log(3,err,8);});
                }
                else{
                    res.render('auth/signup',{tit:'signup_again',messageL:false,messageS:'Password not matching',isAuthenticated:req.session.loggedIn});
                }
            }
        })
        .catch(err=>{console.log(83,err,82);});
}    


const getLogin=(req,res,next)=>{
    res.render('auth/login',{tit:'login',messageS:false,messageL:false,isAuthenticated:false});
}

const postLogin=(req,res,next)=>{
    password=req.body.password;
    accountNumber=req.body.accountNumber;
    user.findOne({accountNumber:accountNumber})
        .then(user=>{
            if(user){
                console.log(76,user.password,password,09);
                if(user.password==password){
                    req.session.loggedIn=true;
                    req.session.accountNumber=user.accountNumber;
                    req.session.us=user;
                    res.render('auth/postLogin',{tit:'postLogin',isAuthenticated:req.session.loggedIn,messageS:false,messageL:'finally logged in'});
                }
                else{
                    res.render('auth/login',{tit:'login',messageS:false,messageL:'Enter correct password',isAuthenticated:!req.session.loggedIn});
                }  
            }
            else{
                res.render('auth/login',{tit:'login',messageS:false,messageL:'Firstly signUp',isAuthenticated:!req.session.loggedIn});
            }
        })
        .catch(err=>{console.log(13,err,81);});
}
 

const getLogout=(req,res,next)=>{
    req.session.destroy(err=>{
        console.log(34,err,8);
        res.redirect('/');
    });  
} 






























module.exports={
    getSignup:getSignup,
    postSignup:postSignup,
    getLogin:getLogin,
    postLogin:postLogin,
    getLogout:getLogout
}