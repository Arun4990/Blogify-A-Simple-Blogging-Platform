const cookieParser = require("cookie-parser");
const express=require("express");
require("dotenv").config();
require("./db")
const app= express();
const session=require('express-session');
const auth = require("./routes/auth");
const blog = require("./routes/blog");
const helmet=require("helmet");
const mongoStore=require("connect-mongo");
const PORT=process.env.PORT;

app.use(helmet());
app.set("view engine","ejs");

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render("error", { message: "Something went wrong!" });
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
    secure: process.env.NODE_ENV === 'production', // Only over HTTPS in production
    httpOnly: true,
    sameSite: 'strict'
  },
  store: mongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 60 * 60 // = 1 hour
  })
}));
app.use('/public', express.static('public'));
app.use("/",auth)

app.use("/",blog);





app.listen(PORT,()=>{
    console.log(`Server listen at ${PORT}`)
})