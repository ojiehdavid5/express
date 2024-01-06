const express = require('express');
const app = express();
const path = require('path');
const errorHandler=require('./middleware/errorHandler');

const cors=require('cors');
const corsOptions=require("./config/corsOptions");

const {logger}=require("./middleware/logEvents");
const PORT = process.env.PORT || 3500;

// CORS
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

//routes
app.use("/",require("./routes/root"));

app.use("/subdir",require("./routes/subdir"));
app.use("/employees",require("./routes/api/employees"));
app.use("register.",require("./routes/api/register"));






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