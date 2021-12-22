const express = require ( 'express' );
const mongoose = require('mongoose');
const app = express();
const postmodel=require("./models/post");
app.use(express.urlencoded({extended: true}));
app.use(express.json())

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
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/posts",(req, res, next)=>{
  const post = new postmodel({
    title: req.body.title,
    content: req.body.content
  });
  post.save(function(err, doc) {
    if (err) return console.error(err);
    console.log("Document inserted succussfully!");
  });

  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
  next()
});

app.delete("/api/posts/:id", (req, res, next)=>{
  postmodel.deleteOne({_id:req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({
      message:"Post deleted!"
    });
  });
});

app.get('/api/posts', (req, res, next) =>{
  postmodel.find()
  .then((documents)=>{
    console.log(documents);
    res.status(200).json({
      message: 'Posts Fetched Successfully',
      posts: documents
    });
  });
});

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

module.exports = app;
