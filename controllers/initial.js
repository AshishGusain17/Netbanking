const user=require('../data/user');
const profile=require('../data/profile');
const details=require('../data/details');

const start=(req,res,next)=>{
    // console.log(5,Date());
    res.render('initial/start',{tit:'just the start',isAuthenticated:req.session.loggedIn});
}
 

module.exports={
    start:start
} 