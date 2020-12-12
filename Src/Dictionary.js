const express=require('express');
const path=require('path');
const Caller=require('../Handler/search');
const app=express();
const hbs=require('hbs');
let port =process.env.PORT||3000;

//define paths
const Public=path.join(__dirname,'../Public');
const views=path.join(__dirname,'../Templates/views');
const partials=path.join(__dirname,'../Templates/partials');
//set up handle bars
app.set('view engine','hbs');
app.set('views',views);
hbs.registerPartials(partials);

//set up static directory to serve
app.use(express.static(Public));

app.get('',(req,res)=>{
   res.render('index');
});
app.get('/about',(req,res)=>{
 res.render('about');
});
app.get('/contact',(req,res)=>{
   res.render('contact');
});
app.get('/search',(req,res)=>{
   if(!req.query.search){
      res.send({error:'please provide a search input'});
   }
   else{
      // 
      Caller(req.query.search,(error,response)=>{
         if(error){
            res.send({error:error});
         }
         else{
            res.send(response);
         }
      })
   }
});
app.get('*',(req,res)=>{
   res.render('404');
});
app.listen(port,()=>{
   console.log('started on Port 3000');
});