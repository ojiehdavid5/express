const express = require('express');
const app = express();
const path = require('path');
const errorHandler=require('./middleware/errorHandler');

const cors=require('cors');

const {logger}=require("./middleware/logEvents");
const PORT = process.env.PORT || 3500;

// CORS
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
app.use(cors(corsOptions));

//custom middleware logger

app.use(logger);


//built in middleware to handle urlencoded data
//in other words,form data
//'contentype:application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true} ));
//built in middleware for json
app.use(express.json());


//built in middleware for static files
app.use(  "/" , express.static(path.join(__dirname, '/public')));
app.use(  "/subdir", express.static(path.join(__dirname, '/public')));
app.use("/subdir",require("./routes/subdir"));
app.use("/",require("./routes/root"));





// chaining route handlers
// const one = (req, res, next) => {
//     console.log('one');
//     next();
// }

// const two = (req, res, next) => {
//     console.log('two');
//     next();
// }

// const three = (req, res) => {
//     console.log('three');
//     res.send('Finished!');
// }

// app.get('/chain(.html)?', [one, two, three]);

app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts("html")){
       res. sendFile(path.join(__dirname, 'views', '404.html'));

    }
     else if(req.accepts("json")){
        res.json({error:"404 not found"});

    }else{
        res.type('txt').send("404 not found");
    }
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));