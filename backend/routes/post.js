const express = require ( 'express' );

const checkAuth = require("../middleware/check-auth");
const postmodel=require("../models/post");

const router = express.Router();

router.post("", checkAuth, (req, res, next)=>{
  const post = new postmodel({
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId
  });
  post.save().then(result=>{
    res.status(201).json({
      message: 'Post added successfully',
      postId: result._id

    });
  });
});

router.put("/:id", checkAuth, (req, res, next)=>{
  const post = new postmodel({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId
  });
  postmodel.updateOne({_id:req.params.id, creator: req.userData.userId}, post).then(result =>{
    if(result.modifiedCount > 0){
      //console.log('Inside PUT!:Update Successful!')
      res.status(200).json({message: "Update Successful!"})
    }else{
      //console.log('Inside PUT!:Not Authorized!')
      res.status(401).json({ message: "Not Authorized!" });
    }
  });
});

router.get('', (req, res, next) =>{
  postmodel.find()
  .then((documents)=>{
    res.status(200).json({
      message: 'Posts Fetched Successfully',
      posts: documents
    });
  });
});

router.get("/:id",(req, res, next)=>{
  postmodel.findById(req.params.id).then(post =>{
    if(post){
      res.status(200).json(post);
    }else{
      //console.log('Post not Found!')
      res.status(484).json({message: 'Post not Found!'});
    }
  });
});

router.delete("/:id", checkAuth, (req, res, next)=>{
  postmodel.deleteOne({_id:req.params.id,creator: req.userData.userId}).then(result=>{
    if(result.deletedCount > 0){
      res.status(200).json({ message: "Deleted successful!" });
    }else{
      res.status(401).json({ message: "Not Authorized!" });
    }
  });
});


module.exports = router;


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
});

module.exports = router;
*/

