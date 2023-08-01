require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const rout = require('./routes/auth.js');
let cookieParser = require('./controllers/Auth.js');
const paymentRouter = require('./routes/payment.js');
const forgotRouter = require('./routes/forgotPassword.js');
const resetRouter = require('./routes/resetPassword.js');
cookieParser = cookieParser.cookieParser;
const {STRIPE_KEY_ID,STRIPE_SECRET_KEY} = process.env;

app.use(cookieParser());
app.use(express.json());
app.use(cors(
    {
        origin:['http://localhost:3000'],
        method:['post','get','patch','delete'],
        credentials:true
    }
));

app.use(bodyParser.urlencoded());
app.use(rout.router);
app.use(paymentRouter.router);
app.use(forgotRouter.router);
app.use(resetRouter.router);
app.listen(8080,()=>{
    console.log('server started');
})