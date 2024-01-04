
const cors=require('cors');



const whiteList=["www.yoursite.com","http://localhost:3500" ,"www.goggle.com"];
const corsOptions={
    origin:(origin,callback)=>{
        if(whiteList.indexOf(origin)!= -1  || !origin){
            callback(null,true);
        }else{
            callback(new Error("NOT ALLOWED BY CORS"))
        }
    },optionSuccessStatus:200
}

module.exports=corsOptions
