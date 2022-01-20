const express = require ( 'express' );
const mongoose = require('mongoose');
const app = express();
const postmodel=require("./models/post");
app.use(express.urlencoded({extended: true}));
app.use(express.json())

const postroutes = require('./routes/post');
const  userroutes = require("./routes/user");

const url = 'mongodb://127.0.0.1:27017/post_database'
mongoose.connect(url, { useNewUrlParser: true })
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})
db.on('error', err => {
  console.error('connection error:', err)
})

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.use("/api/posts", postroutes);
app.use("/api/user", userroutes);

module.exports = app;

/*app.use('/api/posts', (req, res, next) =>{
  const posts = [
      {
        id: 'snkfkjkf',
        title: 'First server-side post',
        content: 'This is comming from the server'
      },
      {
        id: 'gyrrshjhk',
        title: 'Second server-side post',
        content: 'This is commiing from the server'
      },
      {
        id: 'mhsetghj',
        title: 'Third server-side post',
        content: 'This is comming from the server'
      }  ];

  res.status(200).json({
    message: 'Posts Fetched Successfully',
    posts: posts
  });
  console.log('data service called')
});*/


