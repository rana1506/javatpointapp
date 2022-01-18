const express = require ( 'express' );

const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");
const token = jwt.sign();

const router = express.Router();

const usermodel=require("../models/user");
  /*router.post("/signup", (req, res, next) =>{

    const NewUser = usermodel({
      email: req.body.email,
      password: req.body.password
    });
    NewUser.save()
    .then(result =>{
      res.status(201).json({
        message: "User Created",
        result: result
      });
    });
  });*/
  router.post("/signup", (req, res, next) =>{
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const NewUser = usermodel({
        email: req.body.email,
        password: hash
      });
      NewUser.save()
      .then(result =>{
        res.status(201).json({
          message: "User Created",
          result: result
        });
      });
    }).catch(err =>{
      res.status(500).json({
        error: err
      });
    });
  });

  router.post("/login",(req, res, next)=> {
    user.findOne({email: req.body.email}.then(user1=>{
      if(!user1){
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      return bcrypt.compare(req.body.password, user.password).then;
        const token = jwt.sign({email: user.email, userId: user._id},
          "A_very_long_string_for_our_secret",
          { expiresIn: "1h"}
          );
    }));

  });

module.exports = router;
