const express=require("express")
const app=express();
const ExpressError=require('./ExpressError')
app.use((err,req,res,next)=>{
   console.log(err);
   next(err); 
})
const check=(req,res,next)=>{
    let {token}=req.query;
    if(token=='giveaccess') next();
    throw new ExpressError(401,"Access denied")
}
app.use((err,req,res,next)=>{
    let {status=500,message}=err;
    res.status(status).send(message)
})
app.get("/admin",(req,res)=>{
    throw new ExpressError(403,"acces is denied to admin")
})
app.get('/',check,(req,res)=>{
    res.send("main branch")
})
app.listen(3000,()=>{
    console.log("listening")
})