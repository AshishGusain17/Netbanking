const express=require('express');
const app=express();
const body=require('body-parser');
const mongoose=require('mongoose');
const path=require('path');
const session=require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const multer=require('multer');
 
const initial =require('./routes/initial');
const user=require('./routes/user');
const functions=require('./routes/functions');
const auth=require('./routes/auth');
const loan=require('./routes/loan');
const pdfs=require('./routes/pdfs');
const admin=require('./routes/admin');
const shop=require('./routes/shop');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
//app.set('views','views');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname)));
// console.log(23,path.join(__dirname),76);
app.use(body.urlencoded({extended:false}));

const fileStorage=multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,'data/images');
    },
    filename:(req, file, cb)=>{
        cb(null,Date.now() + '-' + file.originalname);
    }
});

const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}

// app.use(bp.urlencoded({extended:false}));
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image')); 

const store = new MongoDBStore({
    uri: 'mongodb+srv://username:password@cluster0-werpd.mongodb.net/Netbanking_database?retryWrites=true&w=majority',

    collection: 'mySessions'
  });
  
app.use(session({secret:'mysecret',
                resave:false,
                saveUninitialized:false,
            store:store}));
app.use(user);
app.use(initial);
app.use(functions);
app.use(loan);
app.use(auth);
app.use(pdfs);
app.use(admin.handler);
app.use(shop);

app.use((req,res,next)=>{
    res.render('error',{tit:'error-no-url',isAuthenticated:false}); 
})

mongoose.connect('mongodb+srv://username:password@cluster0-werpd.mongodb.net/Netbanking_database?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true })
        .then(ob=>{
            app.listen(process.env.PORT || 4000);
            console.log('connected_via_mongooseJS',51);
        })
        .catch(err=>{console.log(5,err,78);});




        