const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.route');
const interviewRouter = require('./routes/interview.route')

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());



app.use('/api/auth', authRouter)
app.use('/api/interview', interviewRouter)

app.get('/',(req,res)=>{
    res.send("api running")
});


module.exports = app
