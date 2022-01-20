const express = require ( 'express' );
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const postmodel=require("../models/post");
router.post("",(req, res, next)=>{
  const post = new postmodel({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result=>{
    res.status(201).json({
      message: 'Post added successfully',
      postId: result._id

    });
  });
});

router.put("/:id", (req, res, next)=>{console.log('Inside PUT!')
  const post = new postmodel({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  postmodel.updateOne({_id:req.params.id}, post).then(result =>{
    console.log(result);
    res.status(200).json({message: "Update Successful!"})
  });
});

router.get('', (req, res, next) =>{
  postmodel.find()
  .then((documents)=>{console.log('Posts Found!')
    //console.log(documents);
    res.status(200).json({
      message: 'Posts Fetched Successfully',
      posts: documents
    });
  });
});

router.get("/:id",(req, res, next)=>{
  postmodel.findById(req.params.id).then(post =>{
    if(post){
      console.log('Post Found!')
      res.status(200).json(post);
    }else{
      console.log('Post not Found!')
      res.status(484).json({message: 'Post not Found!'});
    }
  });
});

router.delete("/:id", (req, res, next)=>{
  postmodel.deleteOne({_id:req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({
      message:"Post deleted!"
    });
  });
});
/*router.post("",(req, res, next)=>{
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

router.delete("/:id", (req, res, next)=>{
  postmodel.deleteOne({_id:req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({
      message:"Post deleted!"
    });
  });
});

router.get('', (req, res, next) =>{
  postmodel.find()
  .then((documents)=>{
    console.log(documents);
    res.status(200).json({
      message: 'Posts Fetched Successfully',
      posts: documents
    });
  });
});
router.put("/:id", (req, res, next)=>{
  const post = new postmodel({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  postmodel.updateOne({_id:req.params.id}, post).then(result =>{
    console.log(result);
    res.status(200).json({message: "Update Successful!"})
  });
});*/
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

module.exports = router;
